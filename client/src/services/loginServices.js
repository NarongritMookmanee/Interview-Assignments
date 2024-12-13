import axiosInstance from "../configs/axios.config.js";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

export async function login(email, password) {
    try {
        console.log({ username: email, password })
        const data = await axiosInstance().post(
            `/login`,
            { email, password },
            { withCredentials: true }
        )
        // console.log(data)
        // console.log(Cookies.get('auth_token'))
        localStorage.setItem('usrCredential', JSON.stringify(await jwtDecode(Cookies.get('auth_token'))))
        return data

    } catch (error) {
        console.error(error)
        alert(error.response.data.message || error.message)
        return error
    }
}