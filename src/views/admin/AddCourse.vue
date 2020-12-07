
<template>
  <div>
    <van-sticky>
      <van-nav-bar
        left-arrow
        left-text="返回"
        title="添加课程"
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
          label="课程名"
          placeholder="课程名"
          :rules="[{ required: true, message: '请填写课程名' }]"
        />
      </div>

      <div>
        <van-field
          v-model="from.number"
          label="课程号"
          placeholder="课程号"
          :rules="[{ required: true, message: '请填写课程号' }]"
        />
      </div>

      <div>
        <van-field
          v-model="from.learnTime"
          label="学时"
          placeholder="学时"
          :rules="[{ required: true, message: '请填写学时' }]"
        />
      </div>

      <div>
        <van-field
          v-model="from.credit"
          label="学分"
          placeholder="学分"
          :rules="[{ required: true, message: '请填写学分' }]"
        />
      </div>

      <div></div>
    </van-form>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
export default {
  name: "AddCourse",
  components: {
    [Toast.name]:Toast
  },
  data() {
    return {
      from: {},
    };
  },
  created() {
    const that = this
    that.$jwt.login(that)
  },
  methods: {
    onSubmit() {
      const that = this;
      let from = that.from;
      let hasNull = that.$str.isEmpty(from);

      if (hasNull) {
        that.$str.log('信息不完整')
      }
      this.$axios
        .post("/sims/course/v1/add", this.from, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          Toast.success('操作成功!');
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
