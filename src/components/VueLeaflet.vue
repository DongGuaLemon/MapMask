<template>
  <div style="width:100%;min-height:100vh;">
    <alert />
    <div class="vue-leaflet">
      <div class="title">
        <h2>(台東縣)實名制口罩存量地圖</h2>
        <h5>口罩存量更新時間:{{sourcetime}}</h5>
      </div>
      <l-map style="width: 100%; height: 500px;z-index:10" :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <vmarkercluster>
          <l-marker
            v-for="(item,index) in mapdata"
            :lat-lng="coordinate(item.lon,item.lat)"
            :key="index"
          >
            <l-popup :content="markinfo(item)" />
            <l-icon :icon-anchor="staticAnchor" class-name="someExtraClass">
              <div style="width:50px">
                <span>{{ item.medical_name }}</span>
                <img src="../assets/mark.png" />
              </div>
            </l-icon>
          </l-marker>
        </vmarkercluster>
      </l-map>
      <div class="footerblock">
        <div class="rightsick">
          <h5>全國嚴重特殊傳染性肺炎本土病例及境外移入病例</h5>
          <div class="sickmember">
            <div class="check sick sickblock">
              <span>11</span>人
              <br />確診
            </div>
            <div class="death sick sickblock">
              <span>0</span>人
              <br />死亡
            </div>
            <div class="update sick">
              <span>2020/02/3</span>
              <br />更新日期
            </div>
          </div>
          <p>
            資料來源:
            <a
              href="https://nidss.cdc.gov.tw/ch/Default.aspx"
            >https://nidss.cdc.gov.tw/ch/Default.aspx</a>
          </p>
        </div>
        <div class="sickimg">
          <img src="../assets/logo.svg" height="130" alt="logo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import vmarkercluster from "vue2-leaflet-markercluster";
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from "vue2-leaflet";
import { latLng, icon } from "leaflet";
import mark from "../assets/mark.png";
import alert from "./alert";
import axios from "axios";
export default {
  name: "VueLeaflet",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon,
    vmarkercluster,
    alert
  },
  data() {
    return {
      mapdata: [],
      zoom: 12,
      center: L.latLng(22.7606107, 121.1428803),
      url:
        "http://a.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoiem9uZ3dlaSIsImEiOiJjazY4eTZwOHMwYTRvM21xanZ1bzc4cXUxIn0.NQC4NVICfb0iPfKi-BPWlQ",
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      staticAnchor: [24, 32],
      sourcetime:''
    };
  },
  methods: {
    coordinate(xLat, yLng) {
      return [xLat, yLng];
    },
    markinfo(item){
        return `成人口罩:${item.adult_mask}<br/>
                兒童口罩:${item.child_mask}<br/>
                地址:${item.address}<br/>
                電話:${item.tel}<br/>`
    },
    map() {
      var vm = this;
      axios({
        method: "POST",
        url: `http://172.16.5.17:3000/maskstock`,
        responseType: "json",
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(response => {
            console.log(response.data)
          vm.mapdata = response.data;
          vm.sourcetime = response.data[0]["source_time"]
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    this.map();
  }
};
</script>

<style>
.footerblock {
  width: 100%;
  flex-wrap: wrap;
  display: flex;
  justify-content: space-between;
  z-index: 10;
}
.rightsick {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title h2 {
  padding: 10px;
}
.title h5 {
  padding: 10px;
}
.rightsick p a {
  font-size: 12px;
}
.rightsick h5 {
  padding: 10px;
}
.sickmember {
  margin-top: -15px;
  display: flex;
  justify-content: center;
}
.check span {
  color: red;
  font-weight: 800;
  font-size: 25px;
}
.death span {
  color: gray;
  font-weight: 800;
  font-size: 25px;
}
.update span {
  color: darkcyan;
  font-weight: 800;
  font-size: 25px;
}
.sickblock {
  height: 50px;
  position: relative;
  margin-left: 10px;
}
.sick {
  height: 50px;
  position: relative;
  margin-left: 25px;
  padding: 15px;
}
.check {
  margin-left: 0px;
}
.sickblock::after {
  content: "|";
  position: absolute;
  font-size: 25px;
  top: 28%;
  height: 50px;
  margin-left: 25px;
}
@media screen and (min-width: 300px) and (max-width: 450px) {
  .sickimg {
    width: 100%;
  }
  .rightsick {
    width: 100%;
  }
}
</style>
