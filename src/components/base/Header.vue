<template>
  <van-nav-bar :title="title" :z-index="2000"  :left-arrow="isLeft" fixed @click-left="onClickLeft" @click-right="onClickRight">
    <van-icon name="search" slot="right" v-if="isRight"/>
  </van-nav-bar>
</template>

<script>
export default {
  name: "Header",
  props: ["isLeft", "title", "isRight"],
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push("/search");
    }
  }
};
</script>
