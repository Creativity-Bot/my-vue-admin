import axios from 'axios';
import { ElNotification } from 'element-plus';
const service = axios.create({
    baseURL: "http://www.demo.com", // replace it with env variable later
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
    console.log('response', response);
    return response;
}, (error) => {
    ElNotification({
        title: 'Error',
        message: error.message,
        type: 'error',
    });
    return Promise.reject(error); // throw error
});

export default service
