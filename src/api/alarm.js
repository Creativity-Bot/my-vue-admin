import { get } from '@/utils/http';

const AlarmApiType = {
    ALARM_LIST: '/alarmList',
}

function getAlarmList(){
    return get(AlarmApiType.ALARM_LIST);
}

export { getAlarmList };