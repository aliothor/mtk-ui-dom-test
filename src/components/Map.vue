<!--
 * @Author: pluto
 * @Date: 2022-04-07 14:24:04
 * @LastEditors: pluto
 * @LastEditTime: 2022-04-07 14:52:17
 * @Description: 地图组件
 * 
-->
<script setup>
import { ref, onMounted } from "vue";
import * as maptalks from "maptalks";
import "maptalks/dist/maptalks.css";
import Popup from "./Popup.vue";
import PopupSlot from "./PopupSlot.vue";

const popupRef = ref(null);
const popupTempRef = ref(null);

//默认不显示Popup组件
const showPopup = ref(false);

onMounted(() => {
  var map = new maptalks.Map("map", {
    center: [-0.113049, 51.498568],
    zoom: 14,
    baseLayer: new maptalks.TileLayer("base", {
      urlTemplate: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
      subdomains: ["a", "b", "c", "d"],
      attribution:
        '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>',
    }),
  });

  var layer = new maptalks.VectorLayer("vector").addTo(map);
  var marker = new maptalks.Marker([-0.113049, 51.49856]).addTo(layer);


  //使用vue3 teleport特性
  let divContent = document.getElementById("popup-target");
  marker.setInfoWindow({
    content: divContent,
  });

  let infoWindow = marker.getInfoWindow();

  //当显示infoWindow事件触发时才显示Popup组件
  infoWindow.on("showend", () => {
    console.log("showend");
    showPopup.value = true;
  });

  //使用vue3 slot插槽特性
  var marker2 = new maptalks.Marker([-0.163049, 51.49856]).addTo(layer);

  marker2.setInfoWindow({
    content: popupTempRef.value.$el,
  });
});
</script>

<template>
  <teleport to="#popup-target">
    <Popup ref="popupRef" v-show="showPopup" />
  </teleport>
  
  <PopupSlot ref="popupTempRef">
    <template #header>标题区域</template>
    <template #default>内容区域</template>
    <template #footer>底部区域</template>
  </PopupSlot>
  <div id="map"></div>
</template>

<style scoped>
#map {
  /* position: absolute; */
  width: 100vw;
  height: 100vh;
}
</style>
