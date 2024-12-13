import axios from "axios";

const url = process.env.REACT_APP_API_URL
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJkZW1vQGVtYWlsLmNvbSIsInBhc3N3b3JkIjoiMTIzNDUiLCJ1c2VybmFtZSI6IkpvaG4gRGFydmluY3kiLCJyb2xlIjoidW5kZWZpbmVkXG4gICAgICAgICAgIiwiaWF0IjoxNzMzODc2ODg5LCJleHAiOjE3MzM4ODA0ODl9.-I2ROTJMvD5pdGOKtphLlGrBhkM41iwlfxT8SRTFnJo'

export default function () {
    return axios.create({
        baseURL: url,
        timeout: 300000,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
}