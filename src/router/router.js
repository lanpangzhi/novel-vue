import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import Search from "../views/Search.vue";
import Ranking from "../views/Ranking.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        index: 1,
        keepAlive: true
      }
    },
    {
      path: "/search",
      name: "search",
      component: Search,
      meta: {
        index: 2,
        keepAlive: false
      }
    },
    {
      path: "/ranking",
      name: "ranking",
      component: Ranking,
      meta: {
        index: 3,
        keepAlive: true
      }
    }
  ]
});
