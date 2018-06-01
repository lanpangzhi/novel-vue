<template>
  <div class="home">
    <img src="../assets/logo.png">
    <HelloWorld msg="欢迎访问蓝胖纸小说网站"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "home",
  components: {
    HelloWorld
  }
};
</script>
