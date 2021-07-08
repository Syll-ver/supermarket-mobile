import Vue from "nativescript-vue";
import Vuex from "vuex"
import axios from "axios"
import VueAxios from "vue-axios"

Vue.use(VueAxios, axios);
Vue.use(Vuex);

Vue.prototype.$axios = axios;
Vue.prototype.$axios.defaults.baseURL = 'http://172.16.4.182:9000'

import App from "./components/App";
import Home from "./components/Home";
import Inventory from "./components/Admin/Inventory/Inventory.vue"
import DrawerContent from "./components/DrawerContent";
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";



import { TNSFontIcon, fonticon } from 'nativescript-fonticon'

// Load TNSFonticon
//  TNSFontIcon.debug = true
 TNSFontIcon.paths = {
   fa: './assets/css/fontawesome.min.css',
   far: './assets/css/regular.min.css',
   fas: './assets/css/solid.min.css',
   fab: './assets/css/brand.min.css'
 }
 TNSFontIcon.loadCss()
 Vue.filter('fonticon', fonticon)


// import VueDevtools from 'nativescript-vue-devtools'
Vue.use(RadSideDrawer);

Vue.config.silent = (TNS_ENV === 'production');

new Vue({
    render (h) {
        return h(
          App,
          [
            h(DrawerContent, { slot: 'drawerContent' }),
            h(Inventory, { slot: 'mainContent' })
          ]
        )
      },
      data: {
        // server: "http://94.237.65.245:8223/fdss-api",
        server: "https://fdss-eut.biotechfarms.net/fdss-api",
        // inventory: [],
        roles: [],
        delivery: [],
        sales: [],
        suppliers: [],
        users: [],
        localStorage: []
      }
  }).$start();



