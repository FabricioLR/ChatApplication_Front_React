import axios from "axios"

const api = axios.create({
    baseURL: "https://chat-applicationback.herokuapp.com/"
})

export default api