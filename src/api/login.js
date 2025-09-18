import { get, post } from '@/utils/http';

const LoginType = {
    LOGIN: '/login',
}

export function sendLogin(data){
    return post(LoginType.LOGIN, data);
}
