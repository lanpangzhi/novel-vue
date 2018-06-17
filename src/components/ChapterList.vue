<template>
  <div class="chapter-con" >
    <div class="chapter-con-top">
      <span> 共{{ len }}章</span>
      <v-touch tag="a" @tap="reverse">倒序</v-touch>
    </div>
    <ul class="chapter-list">
      <v-touch v-for="(item) in chapterList" tag="li"  @tap="toArticle(item.n)" :key="item.n">{{ item.title }}</v-touch>
    </ul>
  </div> 
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { Toast } from "vant";

export default {
  name: "ChapterList",
  data() {
    return {
      chapterList: [],
      len: 0
    };
  },
  computed: {
    ...mapState({
      list: "list",
      sourceId: "sourceId"
    })
  },
  watch: {
    list: function() {
      this.init();
    }
  },
  created() {
    this.init();
  },
  methods: {
    ...mapMutations({
      upN: "updateN",
      upListN: "updateListN"
    }),
    toArticle(index) {
      let n = index;
      this.upListN({
        [this.sourceId]: n
      });
      this.upN(n);
      this.$router.push("/article");
    },
    reverse() {
      Toast.loading({
        mask: true,
        message: "火速切换..."
      });
      let arr = this.chapterList.slice(0);
      this.chapterList = arr.reverse();
      setTimeout(() => {
        Toast.clear();
      }, 1000);
    },
    init() {
      this.chapterList = this.list.chapters;
      this.len = this.list.chapters.length;
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.chapter-con {
  padding-top: 56px;
  .chapter-list {
    li {
      text-align: left;
      margin: 0 0 0 20px;
      font-size: 16px;
      line-height: 40px;
      border-bottom: 1px solid #eee;
      @include text-ellipsis;
    }
  }
  .chapter-con-top {
    height: 40px;
    padding: 0 20px;
    font-size: 14px;
    border-bottom: 1px solid rgb(235, 42, 42);
    span {
      float: left;
      line-height: 40px;
    }
    a {
      float: right;
      width: 80px;
      line-height: 40px;
      text-align: center;
    }
  }
}
</style>
