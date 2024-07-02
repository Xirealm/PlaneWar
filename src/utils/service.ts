import { http } from "../utils/http"

export const sendCode = async (tel: string) => {
    return await http.post("/send_code/", {
        phone:tel
    })
}
export const register = async (tel: string, name: string, password: string, code: string) => {
    return await http.post("/register/", {
        phone: tel,
        name: name,
        password: password,
        code: code
    })
};
export const login = async(tel: string, password: string) => {
     return await http.post("/log_in/", {
       phone: tel,
       password: password,
     });
};
export const getRank = async(tel:string) => {
    return await http.get(`/rank/`)
}
export const sendScore = async (phone:string, score:string) => {
    return await http.post("/rank/", {
        phone: phone,
        score: score
    })
    
}