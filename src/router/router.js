import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  scrollBehavior(to) {
    if (to.path === "/article") {
      return { x: 0, y: 0 };
    }
  },
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/Home.vue"),
      meta: {
        index: 1,
        keepAlive: true
      }
    },
    {
      path: "/search",
      name: "search",
      component: () => import("../views/Search.vue"),
      meta: {
        index: 2,
        keepAlive: false
      }
    },
    {
      path: "/ranking",
      name: "ranking",
      component: () => import("../views/Ranking.vue"),
      meta: {
        index: 3,
        keepAlive: true
      }
    },
    {
      path: "/detail/:id",
      name: "detail",
      component: () => import("../views/Detail.vue"),
      meta: {
        index: 4,
        keepAlive: true
      }
    },
    {
      path: "/chapter",
      name: "chapter",
      component: () => import("../views/Chapter.vue"),
      meta: {
        index: 5,
        keepAlive: true
      }
    },
    {
      path: "/article",
      name: "article",
      component: () => import("../views/Article.vue"),
      meta: {
        index: 6,
        keepAlive: false
      }
    },
    {
      path: "*",
      name: "404",
      component: () => import("../views/404.vue"),
      meta: {
        index: 7,
        keepAlive: true
      }
    }
  ]
});
