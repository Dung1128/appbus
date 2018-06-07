import { AsyncStorage } from "react-native"

export default class StorageHelper {

    static setStore(key, value) {
        try {
            // AsyncStorage.removeStore(key);
            AsyncStorage.setItem(key, JSON.stringify(value))
        } catch (e) {
            console.log(e);
         }
    }

    static async getStore(key) {
        try {
            const value = JSON.parse(await AsyncStorage.getItem(key));
            return value;
        } catch (e) {
            console.log(e);
        }
    }

    static removeStore(key) {
        try {
            AsyncStorage.removeItem(key)
        } catch (e) { 
            console.log(e);
        }
    }
}

