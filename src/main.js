import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import axios from "axios";

Vue.config.productionTip = false;
// 全局vue添加axios
Vue.prototype.axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
