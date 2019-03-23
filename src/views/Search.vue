<template>
  <div class="search">
    <!-- 头部 -->
    <Header title="搜索" :isLeft="true"/>
    <!-- 头部 end -->
    <!-- 搜索 -->
    <form action="/">
      <van-search
        v-model="value"
        placeholder="请输入小说名称"
        show-action
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <!-- 搜索 -->
    <!-- 搜索结果 -->
    <List :data="searchData" v-show="searchData"/>
    <!-- 搜索结果 end -->
  </div>
</template>

<script>
import Header from "@/components/base/Header.vue";
import List from "@/components/List.vue";
import { Toast } from "vant";

export default {
  name: "Search",
  components: {
    Header,
    List
  },
  data() {
    return {
      searchData: [],
      value: ""
    };
  },
  methods: {
    onSearch() {
      if (this.value === "") {
        Toast.clear();
        Toast("请输入小说名");
      } else {
        Toast.loading({
          mask: true,
          message: "加载中..."
        });
        this.getSerch();
      }
    },
    onCancel() {
      this.value = "";
      this.searchData = [];
    },
    async getSerch() {
      let data = await this.axios.get("/search", {
        params: {
          query: this.value
        }
      });
      if (data.flag === 0) {
        Toast.clear();
        Toast(data.msg);
      }
      if (data.flag === 1) {
        setTimeout(() => {
          Toast.clear();
        }, 500);
        this.searchData = data.books;
      }
    }
  },
  deactivated() {
    this.$destroy();
  }
};
</script>

<style scoped lang="scss">
.search {
  form {
    padding-top: 46px;
  }
}
</style>
