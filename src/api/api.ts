import axios from 'axios'

const baseURL = "https://localhost:4200";

export const useAxios = (method: string, url: string, headers?: any): void => {
    axios({
        method,
        baseURL,
        url,
        headers: {},
    }).then(res => console.log(res))
}