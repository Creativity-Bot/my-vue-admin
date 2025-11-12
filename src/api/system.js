import { post } from '@/utils/http';

const SystemApiType = {
    GET_AUTH_LIST: '/userAuth',
    SET_AUTH: '/setAuth',
}

function getAuthListApi(data){
    return post(SystemApiType.GET_AUTH_LIST, data);
}

function setAuthApi(data){
    return post(SystemApiType.SET_AUTH, data);
}

export {
    getAuthListApi,
    setAuthApi,
}