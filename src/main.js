import Vue from 'vue'
import App from './App.vue'
import vueRouter  from 'vue-router'
import Routes from './route'
import { Icon } from "leaflet";
import 'leaflet/dist/leaflet.css';
Vue.use(vueRouter)
Vue.config.productionTip = false
const router = new vueRouter({
  routes: Routes
}); 
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});
new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
