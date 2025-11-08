import { get } from '@/utils/http';
const DocumentApiType = {
    DOCUMENT_LIST: '/document',
}
function getDocumentList(){
    return get(DocumentApiType.DOCUMENT_LIST);
}
export { getDocumentList };