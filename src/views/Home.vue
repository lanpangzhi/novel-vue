<template>
  <div class="home">
    <!-- 头部 -->
    <Header title="首页" :left="false"/>
    <!-- 头部 end -->
    <!-- 下拉刷新 -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <List :data="indexData" top="top" bottom="bottom"/>
    </van-pull-refresh>
    <!-- 下拉刷新 end -->
    <!--  导航 -->
    <Nav/>
    <!--  导航 end -->
  </div>
</template>

<script>
// @ is an alias to /src
import List from "@/components/List.vue";
import Nav from "@/components/base/Nav.vue";
import Loading from "@/components/base/Loading.vue";
import Header from "@/components/base/Header.vue";
import { Toast } from "vant";

export default {
  name: "home",
  components: {
    List,
    Nav,
    Loading,
    Header
  },
  data() {
    return {
      indexData: [],
      isLoading: false
    };
  },
  created() {
    this.pageInit();
  },
  methods: {
    pageInit() {
      this.getIndexData();
    },
    onRefresh() {
      this.getIndexData();
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
    async getIndexData() {
      let data = await this.axios.get("/index");
      if (data.flag === 1) {
        this.indexData = data.books;
      } else {
        Toast.fail(data.msg);
      }
    }
  }
};
</script>
