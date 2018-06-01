<template>
  <van-loading color="white" v-if="off"/>
</template>

<script>
export default {
  name: "Loading",
  props: {
    off: Boolean
  }
};
</script>

<style scoped lang="scss">
.van-loading--white {
  position: fixed;
  z-index: 88888;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  padding: 15px;
  border-radius: 5px;
  margin: auto;
  background: rgba(0, 0, 0, 0.5);
}
</style>
