import Config from "react-native-config";


// console.log('Config :', Config);

const baseLogin = `${Config.API_URL}kasir/login`
const baseKasir = `${Config.API_URL}kasir/`
const baseRole = `${Config.API_URL}role/`
const baseMeja = `${Config.API_URL}meja/`
const baseCategory = `${Config.API_URL}category/`
const baseMenu = `${Config.API_URL}menu/`
const baseTransaksi = `${Config.API_URL}transaksi/`
const baseDetails = `${Config.API_URL}details/`
const baseReport = `${Config.API_URL}report/`

export {
    baseLogin,
    baseKasir,
    baseRole,
    baseMeja,
    baseCategory,
    baseMenu,
    baseTransaksi,
    baseDetails,
    baseReport
}