<template>
  <div class="detail">
    <!-- 头部 -->
    <Header :title="title" :isLeft="true" :isRight="true"/>
    <!-- 头部 end -->
    <div class="detail-con">
      <!-- 加载loading -->
      <Loading v-if="isLoading"/>
      <!-- 加载loading end -->
      <template v-if="!isLoading">
        <!-- 详情列表 -->
        <DetailList :book="book"/>
        <!-- 详情列表 end -->
        <v-touch @tap="toArticle">
          <van-button type="danger" block size="small">开始阅读</van-button>
        </v-touch>
        <v-touch tag="a" class="more" @tap="toChapter">查看目录</v-touch>
      </template>
    </div>
  </div>
  
</template>

<script>
import Header from "@/components/base/Header.vue";
import Loading from "@/components/base/Loading.vue";
import DetailList from "@/components/DetailList.vue";
import { Toast } from "vant";
import { mapMutations, mapState } from "vuex";

export default {
  name: "Detail",
  components: {
    Header,
    Loading,
    DetailList
  },
  data() {
    return {
      title: "",
      isLoading: true,
      book: {},
      isOff: false,
      source: {}
    };
  },
  watch: {
    $route(to) {
      if (to.name === "detail") {
        this.isLoading = true;
        this.getDetail();
      }
    }
  },
  computed: mapState({
    id: "id",
    sourceId: "sourceId",
    list: "list"
  }),
  created() {
    this.getDetail();
  },
  deactivated() {
    this.$destroy();
  },
  methods: {
    async getDetail() {
      if (this.isOff) {
        return;
      }
      this.isOff = true;
      let id = this.$route.params.id;
      let bookData = await this.axios.get("book/" + id);
      if (bookData.flag === 0) {
        Toast.clear();
        Toast(bookData.msg);
        return;
      }
      this.title = bookData.book.title;
      this.book = bookData.book;
      let sourceData = await this.axios.get("source/", {
        params: {
          id
        }
      });
      if (sourceData.flag === 0) {
        Toast.clear();
        Toast(sourceData.msg);
        return;
      }
      this.source = sourceData.books;
      this.isOff = false;
      setTimeout(() => {
        this.isLoading = false;
      }, 300);
    },
    async getChapter() {
      let data = await this.axios.get("/chapter", {
        params: {
          id: this.source._id
        }
      });

      if (data.flag === 0) {
        Toast.clear();
        Toast(data.msg);
        return;
      }

      this.upList({
        id: data.id,
        chapters: data.chapters
      });
      this.upN(0);
      this.$nextTick(() => {
        Toast.clear();
      });
      this.$router.push("/article");
    },
    ...mapMutations({
      upId: "updateId",
      upSourceId: "updateSourceId",
      upTit: "updateTit",
      upList: "updateList",
      upN: "updateN"
    }),
    toChapter() {
      Toast.loading({
        mask: true,
        message: "加载中..."
      });
      this.setState();
      this.$router.push("/chapter");
    },
    toArticle() {
      this.setState();
      if (!this.list.chapters || this.list.id !== this.source._id) {
        Toast.loading({
          mask: true,
          message: "加载中..."
        });
        this.getChapter();
      } else {
        this.$router.push("/article");
      }
    },
    setState() {
      this.upId(this.book._id);
      this.upTit(this.book.title);
      this.upSourceId(this.source._id);
      setTimeout(() => {
        Toast.clear();
      }, 300);
    }
  }
};
</script>

<style lang="scss" scoped>
.detail-con {
  margin-top: 56px;
  padding-left: 10px;
  padding-right: 10px;
  .more {
    display: inline-block;
    height: 30px;
    padding: 0 40px;
    font-size: 14px;
    line-height: 30px;
    margin-top: 15px;
    color: red;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  .van-button--small {
    margin-top: 10px;
    font-size: 16px;
  }
}
</style>
