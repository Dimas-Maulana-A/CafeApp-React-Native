import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const auth = axios.create();

auth.interceptors.request.use(async(config)=> {
    const token = await AsyncStorage.getItem("@storage_token")
    config.headers.Authorization = `Bearer ${token}`
    return config
}, (err)=>{
    return Promise.reject(err)
})

export {auth}