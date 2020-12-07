<template>
  <div class="layout">
    <br />

    <div>
      <div>
        <van-row>
          <van-col offset="7" span="10">
            <van-dropdown-menu>
              <van-dropdown-item v-model="type" :options="options" />
            </van-dropdown-menu>
          </van-col>
        </van-row>
      </div>

      <div>
        <van-row>
          <van-col offset="0" span="24">
            <div class="from">
              <van-form @submit="onSubmit">
                <van-field
                  left-icon=""
                  v-model="loginFrom.account"
                  label="账号"
                  :placeholder="options[type - 3].name"
                  :rules="[{ required: true, message: '账户不能为空' }]"
                />
                <van-field
                  v-model="loginFrom.password"
                  type="password"
                  label="密码"
                  placeholder="密码"
                  :rules="[{ required: true, message: '密码不能为空' }]"
                />

                <div style="margin: 10px 0">
                  <van-button round block type="info" native-type="submit">
                    登录
                  </van-button>
                </div>
              </van-form>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>
    <div>
      <Copyright />
    </div>
  </div>
</template>

<script>
import Copyright from "@/components/common/Copyright.vue";

export default {
  name: "Login",
  components: {
    Copyright,
  },
  data() {
    return {
      loginFrom: {
        account: "51830021401",
        password: "123456",
        type: 0,
      },
      type: '3',
      options: [
        { text: "管理员登录", name: "工号/用户名", value: '3' },
        { text: "学生登录", name: "学号/用户名", value: '4' },
      ],
    };
  },
  methods: {
    onSubmit(values) {
      const that = this;
      const from = that.loginFrom;
      if (that.checkNull(from.account) || that.checkNull(from.password)) {
        Dialog.alert({
          title: "提示",
          message: "请填写账号信息",
        }).then(() => {});
        return;
      }
      that.loginFrom.type = that.type;
      let url = "";
      if (that.type === '4') {
        url = "/sims/student/v1/login";
      } else if (that.type === '3') {
        url = "/sims/leader/v1/login";
      }

      that.$axios.post(url, that.loginFrom).then((res) => {
        try {
          const jwt = res.headers["authorization"];
          const userInfo = res.data.data;
          // 把数据共享出去
          that.$store.commit("SET_TOKEN", jwt);
          that.$store.commit("SET_USERINFO", userInfo);
          that.$router.push("/home");
          setTimeout(() => {
            this.$router.go(0);
          }, 100);
        } catch (e) {
          Dialog.alert({
            title: "提示",
            message: "服务器异常",
          }).then(() => {});
        }
      });
    },

    checkNull(value) {
      if (value === null || value === "" || typeof value === "undefined") {
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>
.layout {
  /*flex-direction: row-reverse;*/
  background-image: url("https://api.ixiaowai.cn/gqapi/gqapi.php");
  height: 100vh;
}
.from {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
