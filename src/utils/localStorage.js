import AsyncStorage from "@react-native-async-storage/async-storage";

const getItem = async (key) => {
    try {
        const res = await AsyncStorage.getItem(key)
        return res;
    } catch (error) {
        console.log(error)
    }
}

const setItem = async (key,value)=> {
    try {
        await AsyncStorage.setItem(key, value)
        console.log("setItem", value)
    } catch (error) {
        console.log(error)
    }
}

const removeItem = async(key)=> {
    try {
        await AsyncStorage.removeItem(key)
        console.log("removeItem", value)
    } catch (error) {
        console.log(error)
    }
}

const clearItem = async()=> {
    try {
        await AsyncStorage.clear()
        console.log("clear")
    } catch (error) {
        console.log(error)
    }
}

export {getItem,setItem,removeItem,clearItem}