import { domain, cache } from '../commons/Config';

const API_URL = {
    api_login: domain + '/api/appdriver/login',
    api_logout: domain + '/api/appdriver/logout',
    api_get_menu: domain + '/api/appdriver/menu',
    api_get_route: domain + '/api/appdriver/get-tuyen',
    api_get_node: domain + '/api/appdriver/get-bus-not',
    api_get_bus_stop: domain + '/api/appdriver/get-diem-don-tra',
    api_get_category_ticket: domain + '/api/appdriver/get-danh-muc-ve',
    api_save_customer: domain + '/api/appdriver/save-khach-len-xuong',
    api_get_handover: domain + '/api/appdriver/get-ban-giao',
    api_get_vehicle: domain + '/api/appdriver/get-xe',
    api_get_employees: domain + '/api/appdriver/get-nhan-vien',
    api_save_handover: domain + '/api/appdriver/save-ban-giao',
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
            headers = {
                "Content-Type": "application/json",
                "Cache-Control": cache,
            }

            opts = {
                method: method,
                headers: headers,
            }

            if (headers["Content-Type"] == "application/json") {
                opts.body = JSON.stringify(param);
            }
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
