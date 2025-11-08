import {post} from '@/utils/http';

const SystemApiType = {
    PERMISSION_LIST: '/permissionList',
}

function getPermissionList(data){
    return post(SystemApiType.PERMISSION_LIST, data);
}

export {
    getPermissionList,
}