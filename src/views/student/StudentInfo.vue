<template>
  <div>
    <Top title="我的" />
    <UserInfo :user="user" />

    <Menu :actity="4" />
  </div>
</template>

<script>
import Menu from "@/components/common/Menu.vue";
import UserInfo from "@/components/common/UserInfo.vue";
import Top from "@/components/common/Top.vue";

export default {
  name: "StudentInfo",
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
