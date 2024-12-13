import axiosInstance from "../configs/axios.config";
import Cookies from "js-cookie"

export async function getUsers() {
    try {
        const { data } = await axiosInstance().get(
            `/api/users`,
            { withCredentials: true }
        )
        return data

    } catch (error) {
        console.error(error)
        alert(error.response.data.message || error.message)
        return error
    }

}

export async function getUserById(id) {
    try {
        const { data } = await axiosInstance().get(
            `/api/users/${id}`,
            { withCredentials: true }
        )
        return data

    } catch (error) {
        console.error(error)
        alert(error.response.data.message || error.message)
        return error
    }
}

export async function createUser(userCredential) {
    try {
        const { data } = await axiosInstance().post(
            `/api/users`,
            userCredential,
            { withCredentials: true }
        )
        return data

    } catch (error) {
        console.error(error)
        alert(error.response.data.message || error.message)
        return error
    }
}

export async function updateUser(id, userCredential) {
    try {
        const { data } = await axiosInstance().put(
            `/api/users/${id}`,
            userCredential,
            { withCredentials: true }
        )
        return data

    } catch (error) {
        console.error(error)
        alert(error.response.data.message || error.message)
        return error
    }

}

export async function deleteUser(id) {
    try {
        const { data } = await axiosInstance().delete(
            `/api/users/${id}`,
            { withCredentials: true }
        )
        Cookies.remove('auth_token')
        localStorage.clear('usrCredential')
        return data

    } catch (error) {
        console.error(error)
        alert(error.response.data.message || error.message)
        return error
    }
}