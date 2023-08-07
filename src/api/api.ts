import axios from 'axios'
import { onMounted, reactive, toRefs } from 'vue';
// const baseURL = "https://localhost:3000";

export const useAxios = (method: string, url: string, headers?: any) => {
    //攔截請求
    axios.interceptors.request.use(config => {
        // console.log("request =>", config)
        return config
    }, error => {
        return Promise.reject(error)
    })
    //攔截回應
    axios.interceptors.response.use(response => {
        // console.log("response =>", response.data)
        return response.data
    }, error => {
        return Promise.reject(error);
    })
    //初始化值
    const state = reactive({
        loading: false,
        error: false,
        data: []
    })
    //請求....bug
    const fetchData = () => {
        state.loading = true;
        return axios({
            method,
            url,
            headers: {}
        }).then(response => {
            console.log("res", response)
            state.data = response
        }).catch(err => {
            state.error = true
            state.loading = false
        })
    }
    return fetchData()
}