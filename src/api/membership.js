import { post } from '@/utils/http';
const MembershipApiType = {
    MEMBERSHIP_LIST: '/member',
}
function getMembershipList(data){
    return post(MembershipApiType.MEMBERSHIP_LIST, data);
}
export { getMembershipList };