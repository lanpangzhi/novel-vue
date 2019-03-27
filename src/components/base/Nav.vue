<template>
    <van-tabbar :z-index="2000" v-model="active" @change="change">
      <van-tabbar-item v-for="item in data" :icon="item.icon" :to="item.path" :key="item.name">{{ item.name }}</van-tabbar-item>
    </van-tabbar>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      active: 0,
      data: [
        {
          name: "首页",
          path: "/",
          icon: "wap-home",
          n: 0
        },
        {
          name: "搜索",
          path: "/search",
          icon: "search",
          n: 1
        },
        {
          name: "排行",
          path: "/ranking",
          icon: "records",
          n: 2
        }
      ]
    };
  },
  created() {
    let arr = this.data.filter(el => {
      return el.path === this.$router.history.current.path;
    });
    this.change(arr[0].n);
  },
  watch: {
    $route(from) {
      let arr = this.data.filter(el => {
        return el.path === from.path;
      });
      if (arr.length >= 1) {
        this.change(arr[0].n);
      }
    }
  },
  methods: {
    change(n) {
      this.active = n;
    }
  }
};
</script>
