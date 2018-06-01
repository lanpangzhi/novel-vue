<template>
  <ul id="list">
    <li v-for="item in data" :key="item._id">
       <div>
         <img  v-lazy="item.cover"/>
       </div>
       <div>
         <h3>{{ item.title }}</h3>
         <p>{{ item.author }}</p>
         <p>{{ item.shortIntro }}</p>
         <i>{{ item.minorCate }}</i>
       </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Index",
  props: {
    data: Array,
    top: String,
    bottom: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#list {
  padding-left: 10px;
  padding-right: 10px;
}
.top {
  padding-top: 46px;
}
.bottom {
  padding-top: 50px;
}
</style>
