<template>
  <div class="article">
     <Header :title="tit" :isLeft="true"/>
     <div class="article-wrap">
       <Loading v-show="isLoading"/>
       <v-touch @swipeleft="next"  @swiperight="prev" :swipe-options="{direction: 'horizontal'}">
        <ArticleCon :data="article" v-show="!isLoading"/>
       </v-touch>
     </div>
     <div v-if="!isLoading" class="article-btn">
       <v-touch tag="a" @tap="prev" class="article-prev" :class="{ disabled: isPrev }">上一页</v-touch>
       <v-touch tag="a" @tap="next" class="article-next" :class="{ disabled: isNext }">下一页</v-touch>
     </div>
  </div>
</template>

<script>
import Header from "@/components/base/Header.vue";
import Loading from "@/components/base/Loading.vue";
import ArticleCon from "@/components/ArticleCon.vue";
import { mapMutations, mapState } from "vuex";
import { Toast } from "vant";

export default {
  name: "Article",
  components: {
    Header,
    ArticleCon,
    Loading
  },
  data() {
    return {
      currentN: 0,
      link: "",
      chapterlist: [],
      tit: "",
      article: "",
      isLoading: true,
      off: false,
      isPrev: false,
      isNext: false
    };
  },
  created() {
    this.pageInit();
  },
  computed: {
    ...mapState({
      list: "list",
      n: "n",
      sourceId: "sourceId",
      listN: "listN"
    })
  },
  deactivated() {
    this.$destroy();
  },
  watch: {
    n() {
      this.isLoading = true;
      this.pageInit();
    },
    list() {
      this.chapterlist = this.list.chapters;
    }
  },
  methods: {
    ...mapMutations({
      upN: "updateN",
      upListN: "updateListN"
    }),
    async getArticle() {
      if (this.off) {
        return;
      }
      this.off = true;
      let link = this.chapterlist[this.currentN].link;
      let title = this.chapterlist[this.currentN].title;
      let data = await this.axios.get("/article", {
        params: {
          link
        }
      });
      if (data.flag === 0) {
        Toast.clear();
        Toast(data.msg);
        this.tit = "出错了...";
        this.article = "";
      } else {
        this.tit = title;
        this.article = this.toHtml(data.chapter.body);
      }
      setTimeout(() => {
        this.off = false;
        this.isLoading = false;
      }, 500);
    },
    pageInit() {
      if (this.chapterlist.length <= 0) {
        this.chapterlist = this.list.chapters;
      }
      if (this.listN && this.listN[this.sourceId] > 0) {
        this.currentN = this.listN[this.sourceId];
      } else {
        this.currentN = 0;
      }

      if (this.n === 0 && this.listN[this.sourceId] > 0) {
        if (this.listN[this.sourceId] >= this.list.chapters.length - 1) {
          this.isNext = true;
        } else {
          this.isNext = false;
        }
        if (this.listN[this.sourceId] <= 0) {
          this.isPrev = true;
        } else {
          this.isPrev = false;
        }
      } else {
        if (this.n >= this.list.chapters.length - 1) {
          this.isNext = true;
        } else {
          this.isNext = false;
        }
        if (this.n <= 0) {
          this.isPrev = true;
        } else {
          this.isPrev = false;
        }
      }
      this.getArticle();
    },
    toHtml(str) {
      // eslint-disable-next-line
      let re = new RegExp("([^\n])+\n", "g");
      return str.replace(re, $1 => {
        return `<p>${$1}</p>`;
      });
    },
    next() {
      if (this.isNext) {
        return;
      }
      let n = this.currentN;
      n++;
      this.upListN({
        [this.sourceId]: n
      });
      this.upN(n);
    },
    prev() {
      if (this.isPrev) {
        return;
      }
      let n = this.currentN;
      n--;
      this.upListN({
        [this.sourceId]: n
      });
      this.upN(n);
    }
  }
};
</script>

<style lang="scss" scoped>
.article-wrap {
  margin-top: 56px;
}
.article-btn {
  height: 30px;
  line-height: 30px;
  width: 200px;
  margin: 0 auto;
  padding: 5px 10px 5px 10px;
  a {
    padding: 0 15px;
  }
  .article-prev {
    float: left;
  }
  .article-next {
    float: right;
  }
  .disabled {
    color: #ccc;
  }
}
</style>
