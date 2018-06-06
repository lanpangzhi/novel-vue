<script>
import { Dialog } from "vant";

export default {
  name: "404",
  created() {
    this.alert();
  },
  methods: {
    alert() {
      Dialog.alert({
        message: "(小伙子|大姑凉)你来到一个没有书籍的荒芜地带。"
      }).then(() => {
        this.$router.push("/");
      });
    }
  }
};
</script>
