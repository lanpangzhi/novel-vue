import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import axios from "axios";
/* eslint-disable */
import { Loading, Tabbar, TabbarItem, NavBar, Icon, PullRefresh, Lazyload, Search , Tab, Tabs } from "vant";

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
