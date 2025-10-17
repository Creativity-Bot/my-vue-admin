<template>
    <div id="container"></div>
</template>
<script setup>
import AMapLoader from '@amap/amap-jsapi-loader';
import icon from '@/assets/flashIcon.png';
import { onMounted, onUnmounted, ref } from 'vue';
import station from "@/assets/station.jpg"
import { getMapList } from '@/api/map';
const markersData = ref([]);
let map = null;
onMounted(() => {
    AMapLoader.load({
        key: '821ddc99d349a1afec2f8ee038e57e51',
        version: '1.4.15',
        plugins: [],
    }).then((Amap) => {
        map = new AMap.Map("container", {
            // 设置地图容器id
            viewMode: "3D", // 是否为3D地图模式
            zoom: 5, // 初始化地图级别
            center: [116.397428, 39.90923], // 初始化地图中心点位置
        });

        getMapList().then(({data}) => {
            markersData.value = data;
            markersData.value.forEach((item) => {
                //创建信息窗体
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
                map.add(marker);
            });

        })
    }).catch((err) => {
        console.log(err);
    });
});

onUnmounted(() => {
    map?.destroy();
});

</script>
<style lang="less" scoped>
#container {
    width: 100%;
    height: 80vh;
}
</style>