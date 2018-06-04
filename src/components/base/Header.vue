<template>
    <van-nav-bar :title="tit" :z-index="2000"  :left-arrow="left" fixed @click-left="onClickLeft" @click-right="onClickRight">
        <van-icon name="search" slot="right" v-if="right"/>
    </van-nav-bar>
</template>

<script>
export default {
  name: "Header",
  props: ["isLeft", "title", "isRight"],
  data() {
    return {
      left: this.isLeft,
      tit: this.title,
      right: this.isRight
    };
  },
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
