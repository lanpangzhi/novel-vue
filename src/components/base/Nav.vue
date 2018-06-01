<template>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/serach">搜索</van-tabbar-item>
      <van-tabbar-item icon="records" to="/serach">排行</van-tabbar-item>
    </van-tabbar>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {
      active: 0
    };
  }
};
</script>
