import axios from 'axios';
import { ElNotification } from 'element-plus';
const service = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // replace it with env variable later
    timeout: 5000,
});

service.interceptors.request.use((config) => {
   return config;
}, (error) => {
    ElNotification({
        title: 'Error',
        message: error.message,
        type: 'error',
    });
    return Promise.reject(error);
});

service.interceptors.response.use((response) => {
    if(response.data.code == '200'){
        return response.data;
    }else{
        ElNotification({
        title: 'Error',
        message: response.data.message,
        type: 'error',
        });
        return Promise.reject(new Error(response.data.message)); // throw error
    }
}, (error) => {
    ElNotification({
        title: 'Error',
        message: error.message,
        type: 'error',
    });
    return Promise.reject(error); // throw error
});

export default service
