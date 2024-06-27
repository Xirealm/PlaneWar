import { http } from "../utils/http"

export const sendCode = async (tel: string) => {
    console.log(tel);
    await http.post("/send_code/", {
        phone:tel
    })
}
// export const register = async ()
export const login = () => {
    
}