<template>
  <div v-if="show">
    <div>
      <van-image
        round
        width="10rem"
        height="10rem"
        fit="cover"
        :src="checkNull(showUser.avatar)"
      >
      </van-image>
      <van-contact-card
        type="edit"
        :name="checkNull(showUser.name)"
        :tel="checkNull(showUser.phone)"
        @click="onEdit"
      />
      <van-cell
        :title="$str.isS(showUser.type) ? '学号' : '工号'"
        :value="checkNull(showUser.number)"
        icon="award-o"
      />

      <van-cell
        v-if="$str.isS(showUser.type)"
        title="职务"
        :value="checkNull(showUser.position)"
        icon="records"
      />

      <van-cell title="性别" :value="checkSex(showUser.sex)" icon="manager-o" />

      <van-cell
        title="昵称"
        :value="checkNull(showUser.username)"
        icon="label-o"
      />

      <van-cell
        title="住址"
        :value="checkNull(showUser.address)"
        icon="location-o"
      />

      <van-cell
        title="邮箱"
        :value="checkNull(showUser.email)"
        icon="envelop-o"
      />

      <van-cell
        title="生日"
        :value="checkNull(showUser.birthDay)"
        icon="gift-card-o"
      />
    </div>
  </div>
</template>

<script>
import Menu from "@/components/common/Menu.vue";

export default {
  name: "UserInfo",
  components: {
    Menu,
  },
  props: {
    user: {},
  },
  data() {
    return {
      sysUser: {},
      showUser: {},
      show: false,
    };
  },
  created() {
    const that = this;
    setTimeout(() => {
      that.showUser = that.user;
      if (!that.$str.isNull(that.showUser)) {
        that.show = true;
      }
    }, 500);
  },
  mounted() {},
  methods: {
    onEdit() {
      this.$router.push("editUserInfo");
    },
    checkNull(value) {
      const that = this;
      if (that.$str.isNull(value)) {
        return "无信息";
      }
      return value;
    },
    checkSex(value) {
      value = this.checkNull(value);
      if (value === "无信息") {
        return value;
      }
      if (value === "1") {
        value = "男";
      }
      if (value === "2") {
        value = "女";
      }
      return value;
    },
  },
};
</script>

<style scoped>
</style>
