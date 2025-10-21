import { post } from '@/utils/http';

const OperationsApiType = {
    ORDER_DELETE: '/batchDelete',
}

function batchDeleteApi(data){
    console.log(data);
    return post(OperationsApiType.ORDER_DELETE, data);
}

export { batchDeleteApi };