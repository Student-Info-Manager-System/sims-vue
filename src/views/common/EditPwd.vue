<template>
  <div>
    <van-sticky>
      <van-nav-bar
        left-arrow
        left-text="返回"
        @click-left="onClickLeft"
        @click-right="onSubmit"
      >
        <template #title> 修改密码 </template>

        <template #left> </template>

        <template #right>
          <van-icon name="success" />
        </template>
      </van-nav-bar>
    </van-sticky>

    <van-form @submit="onSubmit">

      <div>
        <van-field v-model="from.oldPwd" label="旧密码" type="password" placeholder="旧密码" :rules="[{ required: true, message: '旧密码不能为空' }]"/>
      </div>
      <div>
        <van-field v-model="from.newPwd" label="新密码" type="password" placeholder="新密码" :rules="[{ required: true, message: '新密码不能为空' }]"/>
      </div>
      <div>
        <van-field v-model="from.newTwoPwd" label="确认密码" type="password" placeholder="确认密码" :rules="[{ required: true, message: '确认密码不能为空' }]"/>
      </div>

      
    </van-form>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
export default {
  name: "EditPwd",
  components: {
  },
  data() {
    return {
      from: {},
    };
  },
  created() {
    const that = this;
    let u = that.$jwt.inu(that);
    that.from.id = u.id
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSubmit() {
      const that = this;

      that.$axios
        .post("/sims/user/v1/editPwd", that.from, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.success) {
            Dialog.confirm({
              title: "提示",
              message: "修改成功",
            }).then(() => {});
          }
        });
    },
  },
};
</script>

<style scoped>
</style>
