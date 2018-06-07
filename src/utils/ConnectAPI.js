import { domain, cache } from '../commons/Config';

const API_URL = {
    login: domain + '/api/appdriver/login',
    // login: domain + '/api/api_adm_dang_nhap.php',
}

const API_HEADERS = {
    login_id: {
        "Content-Type": "application/json",
        "Accept-Encoding": "identity",
    },
}

const HttpError = {
    no_network: 'Network request failed'
}

const fetchData = async (type, param = {}, method = "GET", retry = undefined) => {
    if (!(type in API_URL)) return []
    let url = API_URL[type]
    try {
        // Khai báo headers mặc định
        let headers = {
            "Content-Type": "multipart/form-data",
            "Cache-Control": cache,
        }
        // Gán lại headers nếu có
        if (type in API_HEADERS) headers = Object.assign(headers, API_HEADERS[type])

        // Tạo biến opts
        let opts = {
            method: method,
            headers: headers,
        }

        // Method GET
        if (method == "GET") {
            if (Object.keys(param).length) url += "?" + Object.keys(param).map((k) => k + "=" + encodeURIComponent(param[k])).join("&")
        }

        // Method POST
        else if (method == "POST") {
            let formData = new FormData()
            if (headers["Content-Type"] == "application/json") opts.body = JSON.stringify(param)
            else {
                formData.append("data", JSON.stringify(param))
                opts.body = formData
            }
        }

        console.log(url);
        // Trả về dữ liệu json
        let response = await fetch(url, opts)
        let responseJson = await response.json()
        return responseJson
    } catch (e) {
        console.error("HttpError", e);
        console.error("HttpError", url);
        console.error("HttpError", param);
        if (e.toString().indexOf(HttpError.no_network) > -1) {
            let props = {
                title: 'No Connection',
                message: 'Có lỗi trong quá trính lấy dữ liệu.<br>Vui lòng kiểm tra lại kết nối',
                typeAlert: 'warning',
                titleButton: 'Thử lại',
                callback: retry
            }
            alert(props)
        }
    }
}

export default fetchData
