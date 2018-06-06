<template>
  <div class="detail-list">
    <div class="detail-list-pic">
      <img :src="book.cover" />
    </div>
    <div class="detail-list-info">
      <h2 class="detail-list-tit">{{ book.title }}</h2>
      <p class="detail-list-sp1"><span>{{ book.author }}</span>|<span>{{ book.minorCate }}</span>|<span>{{ (book.wordCount/10000).toFixed(2) }}万字</span></p>
      <p class="detail-list-time">更新时间: <span>{{ time }}</span></p>
      <p class="detail-list-last">最新文章: {{ book.lastChapter }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailList",
  props: ["book"],
  computed: {
    time() {
      let dateStr = this.book.updated.split(".")[0];
      return dateStr.replace("T", "  ");
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-list {
  .detail-list-pic {
    width: 140px;
    height: 200px;
    margin: 0 auto;
    padding: 10px 0;
    img {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 2px;
      border: 1px solid #ccc;
    }
  }
  .detail-list-info {
    .detail-list-tit {
      line-height: 28px;
    }
    .detail-list-sp1 {
      line-height: 24px;
      font-size: 14px;
      span {
        padding: 0 5px;
        &:first-of-type {
          color: #f60;
        }
      }
    }
    .detail-list-time {
      line-height: 24px;
      font-size: 14px;
      span {
        color: red;
      }
    }
    .detail-list-last {
      line-height: 24px;
      font-size: 14px;
    }
  }
}
</style>
