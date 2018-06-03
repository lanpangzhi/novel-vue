<template>
  <div class="ranking">
    <!-- 头部 -->
    <Header title="排行榜" :isLeft="true" :isRight="true"/>
    <!-- 头部 end -->
    <!-- 导航 -->
    <Nav/>
    <!-- 导航 end -->
  </div>
</template>

<script>
import Header from "@/components/base/Header.vue";
import Nav from "@/components/base/Nav.vue";

export default {
  name: "ranking",
  components: {
    Header,
    Nav
  }
};
</script>
