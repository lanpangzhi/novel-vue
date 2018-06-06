import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/";
import axios from "axios";
import VueTouch from "vue-touch";
/* eslint-disable */
import { Loading, Tabbar, TabbarItem, NavBar, Icon, PullRefresh, Lazyload, Search, Tab, Tabs, Button } from "vant";

Vue.use(VueTouch, { name: 'v-touch' });
Vue.use(Loading);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Lazyload);
Vue.use(PullRefresh);
Vue.use(Search);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Button);

Vue.config.productionTip = false;
// 全局vue添加axios
Vue.prototype.axios = axios;
// 设置默认请求路径
axios.defaults.baseURL = "https://api.langpz.com";
//拦截器要求axios返回的数据是res.data
axios.interceptors.response.use(res => {
  return res.data;
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
