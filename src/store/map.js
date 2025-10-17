import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getMapList, addMap } from '@/api/map';
export const useMapStore = defineStore('map', () => {
    const markers = ref([]);

    const getMapList = async (data) => {
        const res = await getMapList();
        markers.value = res.data;
    }

    const addMap = async (data) => {
        const res = await addMap(data);
        markers.value.push(res.data);
        const infoWindow = new AMap.InfoWindow({
            offset: new AMap.Pixel(5,-30),
        });
        const marker = new AMap.Marker({
            position: item.position,
            title: item.title,
            icon: icon,
        });
        marker.on('click', () => {
            infoWindow.setContent(`
            <div style="display:flex;padding:10px;align-items:center">
                <div>
                    <img src=${station} style:"width: 200px;">
                </div>
                <div style="width: 180px; line-height: 40px; margin-left: 20px;">
                    <h3>${item.title}</h3>
                    <p>充电桩数量：${item.count}</p>   
                    <p>充电站状态：<span style="color:blue">${item.status == 1 ? "空闲中" : "使用中"}</span></p>
                </div>
            </div>`
            );
            infoWindow.open(map, marker.getPosition());
        });
        return marker;
    }

    return { markers, getMapList, addMap };
})