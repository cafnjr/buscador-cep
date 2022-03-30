import axios from "axios";
import App from "../../App";


const api = axios.create({
    baseURL:'https://viacep.com.br/ws'
})

export default api;