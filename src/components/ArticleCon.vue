<template>
  <div class="article-con" v-html="data">
  </div>
</template>

<script>
export default {
  name: "ArticleCon",
  props: ["data"]
};
</script>

<style lang="scss" scoped>
.article-con {
  padding: 0 10px;
  text-align: left;
  line-height: 34px;
  font-size: 16px;
  text-indent: 2em;
}
</style>
