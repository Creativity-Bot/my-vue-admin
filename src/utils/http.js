import service from './axios';

function get(url, params){
    service.get(url, { params });
}