<!--
 * @Author: pluto
 * @Date: 2022-04-07 14:24:04
 * @LastEditors: pluto
 * @LastEditTime: 2022-04-07 15:06:16
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

const activeKey = ref("1");
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
    <template #header>
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="Tab 1">Content of Tab Pane 1</a-tab-pane>
        <a-tab-pane key="2" tab="Tab 2" force-render>Content of Tab Pane 2</a-tab-pane>
        <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane>
      </a-tabs></template
    >
    <template #default>
      <div>
        <a-button type="primary">Primary Button</a-button>
        <a-button>Default Button</a-button>
        <a-button type="dashed">Dashed Button</a-button>
        <a-button type="text">Text Button</a-button>
        <a-button type="link">Link Button</a-button>
      </div>
    </template>
    <template #footer>
      <a-avatar src="https://joeschmoe.io/api/v1/random" />
      <a-avatar style="color: #f56a00; background-color: #fde3cf">U</a-avatar>
    </template>
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
