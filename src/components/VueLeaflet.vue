<template>
  <div style="width:100%;min-height:100vh;">
    <alert />
    <div class="vue-leaflet">
      <div class="title">
        <h2>{{ $t('title.titleh2')}}</h2>
        <h5>{{ $t('title.titleh5')}}:{{sourcetime}}</h5>
      </div>
      <div class="lang">
        <span v-bind:class="{ active: lang=='tw'}" @click="changlang('tw')">繁體中文</span> |
        |
        <span v-bind:class="{ active: lang=='cn'}" @click="changlang('cn')">简体中文</span> |
        |
        <span v-bind:class="{ active: lang=='en'}" @click="changlang('en')">English</span> |
        |
        <span v-bind:class="{ active: lang=='vn'}" @click="changlang('vn')">Tiếng việt</span> |
        |
        <span v-bind:class="{ active: lang=='pt'}" @click="changlang('pt')">ภาษาไทย</span>
      </div>
      <l-map style="width: 100%; height: 500px;z-index:10" :zoom="zoom" :center="center">
        <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
        <vmarkercluster>
          <l-marker v-for="(item,index) in mapdata" :lat-lng="coordinate(item.lon,item.lat)" :key="index">
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
          <h5>{{ $t('footer.footertitle')}}</h5>
          <div class="sickmember">
            <div class="check sick sickblock">
              <span>16</span>
              {{ $t('footer.footerunit')}}
              <br />
              {{ $t('footer.footercheck')}}
            </div>
            <div class="cure sick sickblock">
              <span>1</span>
              {{ $t('footer.footerunit')}}
              <br />
              {{ $t('footer.footercure')}}
            </div>
            <div class="death sick sickblock">
              <span>0</span>
              {{ $t('footer.footerunit')}}
              <br />
              {{ $t('footer.footerdeath')}}
            </div>
            <div class="update sick">
              <span>2020/02/06</span>
              <br />
              {{ $t('footer.footerupdate')}}
            </div>
          </div>
          <p class="source">
            {{$t('footer.footersource')}}:
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
        "https://a.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoiem9uZ3dlaSIsImEiOiJjazY4eTZwOHMwYTRvM21xanZ1bzc4cXUxIn0.NQC4NVICfb0iPfKi-BPWlQ",
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      staticAnchor: [24, 32],
      sourcetime: "",
      lang: 'tw'
    };
  },
  methods: {
    coordinate(xLat, yLng) {
      return [xLat, yLng];
    },
    markinfo(item) {
      return `${this.$t("mask.adultmask")}:${item.adult_mask}<br/>
               ${this.$t("mask.childmask")}:${item.child_mask}<br/>
               ${this.$t("mask.address")}:${item.address}<br/>
               ${this.$t("mask.phone")}:${item.tel}<br/>`;
    },
    map() {
      var vm = this;
      axios({
        method: "POST",
        url: `https://mask.digitvolunteer.space/maskstock`,
        responseType: "json",
        headers: {
          "Content-type": "application/json"
        }
      })
        .then(response => {
          vm.mapdata = response.data;
          vm.sourcetime = response.data[0]["source_time"];
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    changlang(lang){
        this.$i18n.locale = lang;
        this.lang=lang;
    }
  },
  created() {
    this.map();
    this.$i18n.locale = "tw";
    var vm =this
    navigator.geolocation.watchPosition(function(position) {
      //console.log(position.coords.latitude, position.coords.longitude);
      vm.center = L.latLng(position.coords.latitude,position.coords.longitude)
    });
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
.lang {
  width: 100%;
  margin: 0 auto;
}
.lang span {
  cursor: pointer;
  font-weight: 800;
}
.active {
  color: blue;
}
.sickmember {
  margin-top: -15px;
  display: flex;
  justify-content: center;
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
.cure span {
  color: green;
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
  .check span {
    color: red;
    font-weight: 800;
    font-size: 20px;
  }
  .death span {
    color: gray;
    font-weight: 800;
    font-size: 20px;
  }
  .update span {
    color: darkcyan;
    font-weight: 800;
    font-size: 20px;
  }
  .cure span {
    color: green;
    font-weight: 800;
    font-size: 20px;
  }
  .sickblock {
    height: 50px;
    position: relative;
    margin-left: 10px;
  }
  .sick {
    height: 50px;
    position: relative;
    margin-left: 20px;
    padding: 0px;
  }
  .sickmember{
      margin-top: 2px;
  }
  .check {
    margin-left: 0px;
  }
  .sickblock::after {
    content: "|";
    position: absolute;
    font-size: 20px;
    top: 28%;
    height: 50px;
    margin-left: 10px;
  }
  .source{
      margin-top: 15px;
  }
  .title h2{
      font-size: 1.3em;
  }
}
</style>
