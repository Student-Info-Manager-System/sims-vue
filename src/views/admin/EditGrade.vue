<template>
  <div>
    <van-sticky>
      <van-nav-bar
        left-arrow
        left-text="返回"
        title="修改班级名称"
        @click-left="onClickLeft"
        @click-right="onSubmit"
      >
        <template #right>
          <van-icon name="success" />
        </template>
      </van-nav-bar>
    </van-sticky>

    <van-form @submit="onSubmit">
      <div>
        <van-field
          v-model="from.name"
          label="班级名"
          placeholder="班级名"
          :rules="[{ required: true, message: '请填写班级名' }]"
        />
      </div>
    </van-form>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
export default {
  name: "EditGrade",
  components: {},
  data() {
    return {
      from: {},
    };
  },
  created() {
    const that = this;
    that.$jwt.login(that);

    that.from.gradeId = that.$route.params.id;
    that.from.name = that.$route.params.name;
  },
  methods: {
    onSubmit() {
      const that = this;
      let from = that.from;
      let hasNull = that.$str.hasNull(from.name, from.gradeId);

      if (hasNull) {
        that.$str.log("信息不完整");
      }

      this.$axios
        .post("/sims/grade/v1/edit", this.from, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          Toast.success("操作成功!");
          this.$router.go(-1);
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
</style>
