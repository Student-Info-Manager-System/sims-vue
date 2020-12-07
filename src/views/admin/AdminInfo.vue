<template>
  <div>
    <Top title="我的" />
    <div>
      <van-empty v-if="$str.isNull(user)" description="好清净啊" />
      <UserInfo v-else :user="user" />
    </div>
    

    <Menu :actity="5" />
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import Menu from "@/components/common/Menu.vue";
import UserInfo from "@/components/common/UserInfo.vue";
import Top from "@/components/common/Top.vue";

export default {
  name: "AdminInfo",
  components: {
    Menu,
    UserInfo,
    Top,
  },
  data() {
    return {
      user: {},
    };
  },
  created() {
    const that = this;
    setTimeout(() => {
      that.$jwt.user(that, (u) => {
        that.user = u;
      });
    }, 100);
  },
  methods: {},
};
</script>

<style scoped>
</style>
