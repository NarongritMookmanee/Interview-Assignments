import Cookies from 'js-cookie';

export function logout() {
    try {
        Cookies.remove('auth_token')
        localStorage.clear('usrCredential')
    } catch (error) {
        alert(error.response.data.message || error.message)
    }
}