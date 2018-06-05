<template>
  <ul id="list" :class="{ 'top': isTop, 'bottom': isBottom }">
    <router-link v-for="item in data" :key="item._id" :to="{name: 'detail', params: {id: item._id}}" tag="li">
       <div class="list-pic">
         <img  v-lazy="item.cover"/>
       </div>
       <div class="list-txt">
         <h3 class="list-tit">{{ item.title }}</h3>
         <h4 class="list-author">作者：{{ item.author }}</h4>
         <p class="list-des">{{ item.shortIntro }}</p>
         <i class="list-label" v-if="item.minorCate">{{ item.minorCate }}</i>
       </div>
    </router-link>
  </ul>
</template>

<script>
export default {
  name: "Index",
  props: {
    data: Array,
    isTop: Boolean,
    isBottom: Boolean
  },
  data() {
    return {
      listData: this.data,
      top: this.isTop,
      bottom: this.isBottom
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@mixin text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
@mixin text-two-ellipsis {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
#list {
  padding-left: 10px;
  padding-right: 10px;
  li {
    position: relative;
    z-index: 5;
    margin-top: 10px;
    height: 100px;
    &:last-child {
      margin-bottom: 10px;
    }
  }
  .list-pic {
    float: left;
    width: 90px;
    height: 100px;
    img {
      max-width: 100%;
      height: 100%;
      background: #ccc;
    }
  }
  .list-txt {
    overflow: hidden;
    text-align: left;
    padding-left: 5px;
    .list-tit {
      height: 30px;
      line-height: 30px;
      font-size: 18px;
      @include text-ellipsis;
    }
    .list-author {
      height: 26px;
      line-height: 26px;
      font-size: 14px;
      color: #f60;
      font-weight: normal;
      @include text-ellipsis;
    }
    .list-des {
      line-height: 18px;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
      @include text-two-ellipsis;
    }
    .list-label {
      position: absolute;
      z-index: 8;
      right: 0px;
      top: 28px;
      padding: 5px;
      font-size: 12px;
      font-style: normal;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
  }
}
.top {
  padding-top: 46px;
}
.bottom {
  padding-bottom: 50px;
}
</style>
