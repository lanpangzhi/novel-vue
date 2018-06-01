<template>
    <van-nav-bar :title="title"  :left-arrow="left" fixed @click-left="onClickLeft" @click-right="onClickRight">
        <van-icon name="search" slot="right" />
    </van-nav-bar>
</template>

<script>
export default {
  name: "Header",
  props: ["left", "title"],
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push("/serach");
    }
  }
};
</script>
