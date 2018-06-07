<template>
  <div>
    <Header :title="tit" :isLeft="true" :isRight="true"/>
    <Loading v-if="isLoading"/>
    <ChapterList v-if="!isLoading"/>
  </div>
</template>

<script>
import Header from "@/components/base/Header.vue";
import Loading from "@/components/base/Loading.vue";
import ChapterList from "@/components/ChapterList.vue";
import { mapMutations, mapState } from "vuex";
import { Toast } from "vant";

export default {
  name: "Chapter",
  components: {
    Header,
    Loading,
    ChapterList
  },
  data() {
    return {
      tit: "",
      isLoading: true
    };
  },
  computed: {
    ...mapState({
      sourceId: "sourceId",
      title: "title",
      list: "list"
    })
  },
  watch: {
    title: function() {
      this.tit = this.title;
    },
    $route(to) {
      if (to.name === "chapter") {
        this.isLoading = true;
        this.getChapter();
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.getChapter();
    });
    this.tit = this.title;
  },
  methods: {
    ...mapMutations({
      upList: "updateList"
    }),
    async getChapter() {
      if (this.list.id === this.sourceId) {
        this.isLoading = false;
        return;
      }
      let data = await this.axios.get("/chapter", {
        params: {
          id: this.sourceId
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
      setTimeout(() => {
        this.isLoading = false;
      }, 300);
    }
  }
};
</script>

<style lang="scss" scoped>
.van-loading {
  margin-top: 56px;
}
</style>
