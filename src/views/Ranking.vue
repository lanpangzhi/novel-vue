<template>
  <div class="ranking">
    <!-- 头部 -->
    <Header title="排行榜" :isLeft="true" :isRight="true"/>
    <!-- 头部 end -->
    <!-- 加载动画 -->
    <Loading v-if="isLoading"/>
    <!-- 加载动画 end -->
    <!-- 选项卡 -->
    <van-tabs v-model="active" type="card" @click="changeTab"  v-if="!isLoading">
      <van-tab v-for="(item, n) in rankingTitle" :title="item.name" :key="n">
         <van-tabs @click="tabClick" id="ranking-tab">
            <van-tab v-for="(index, n2) in rankingData[item.id]" :key="n2">
              <div slot="title" class="title">
                {{ index.shortTitle }}
              </div>
              <List :data="currentBook" v-show="currentBook" :isBottom="true"/>
            </van-tab>
         </van-tabs>
      </van-tab>
    </van-tabs>
    <!-- 选项卡 end -->
    <!-- 导航 -->
    <Nav />
    <!-- 导航 end -->
  </div>
</template>

<script>
import Header from "@/components/base/Header.vue";
import Nav from "@/components/base/Nav.vue";
import Loading from "@/components/base/Loading.vue";
import List from "@/components/List.vue";
import { Toast } from "vant";

export default {
  name: "ranking",
  components: {
    Header,
    Nav,
    List,
    Loading
  },
  data() {
    return {
      active: 0,
      isLoading: true,
      rankingTitle: [
        {
          name: "男生",
          id: "male",
          index: 0
        },
        {
          name: "电子书",
          id: "epub",
          index: 0
        },
        {
          name: "女生",
          id: "female",
          index: 0
        }
      ],
      rankingData: {},
      currentTab: "male",
      rankingBook: [],
      currentBook: []
    };
  },
  created() {
    this.pageInit();
  },
  watch: {
    rankingData: function() {
      let id = this.rankingData[this.currentTab][0]._id;
      this.getRanking(id);
    }
  },
  methods: {
    pageInit() {
      this.getRanking();
    },
    tabClick(index2) {
      Toast.loading({
        mask: true,
        message: "加载中..."
      });
      this.rankingTitle[this.active].index = index2;
      let id = this.rankingData[this.currentTab][index2]._id;
      this.getRanking(id);
    },
    changeTab(index2) {
      Toast.loading({
        mask: true,
        message: "加载中..."
      });
      let n = this.rankingTitle[index2].index;
      this.currentTab = this.rankingTitle[index2].id;
      let id = this.rankingData[this.currentTab][n]._id;
      this.getRanking(id);
    },
    async getRanking(id = "") {
      if (id === "") {
        let data = await this.axios.get("/ranking");
        if (data.flag === 1) {
          Toast.clear();
          this.rankingData = data.ranking;
        } else {
          Toast.clear();
          Toast(data.msg);
        }
      } else {
        // 缓存加载过的排行榜
        if (this.rankingBook.length > 0) {
          let arr = this.rankingBook.filter(el => {
            return el.id == id;
          });
          if (arr.length > 0) {
            this.currentBook = arr[0].book;
            Toast.clear();
            return;
          }
        }
        let data = await this.axios.get("/ranking/" + id);
        if (data.flag === 1) {
          Toast.clear();
          this.rankingBook.push({
            id,
            book: data.ranking.books
          });
          this.currentBook = data.ranking.books;
        } else {
          Toast.clear();
          Toast(data.msg);
        }
      }
      setTimeout(() => {
        this.isLoading = false;
      }, 300);
    }
  }
};
</script>
<style lang="scss">
.van-tabs--line .van-tabs__wrap {
  height: 32px;
}
</style>


<style scoped lang="scss">
.ranking {
  min-height: 100%;
  .van-loading {
    margin-top: 56px;
  }
  .van-tabs {
    margin-top: 56px;
    .van-tabs {
      margin-top: 0px;
    }
  }
  .title {
    line-height: 30px;
  }
}
</style>
