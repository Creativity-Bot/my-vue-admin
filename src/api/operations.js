import { post, get } from '@/utils/http';

const OperationsApiType = {
    ORDER_DELETE: '/batchDelete',
    CITY_LIST: '/cityList',
}

function batchDeleteApi(data){
    console.log(data);
    return post(OperationsApiType.ORDER_DELETE, data);
}

function cityListApi(){
    return get(OperationsApiType.CITY_LIST);
}

export { batchDeleteApi, cityListApi };