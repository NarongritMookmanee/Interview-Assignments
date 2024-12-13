import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";

export function isTokenValid() {
    try {
        const token = Cookies.get('auth_token')
        if (!token) return false
        const decodedToken = jwtDecode(token)
        const currentTime = Math.floor(Date.now() / 1000);
        return (decodedToken.exp > currentTime)

    } catch (error) {
        alert(error.message)
    }
}