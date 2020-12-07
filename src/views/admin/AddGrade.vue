
<template>
  <div>
    <van-sticky>
      <van-nav-bar
        left-arrow
        left-text="返回"
        title="添加班级"
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

      <div>
        <van-field
          v-model="from.number"
          label="班级号"
          placeholder="班级号"
          :rules="[{ required: true, message: '请填写班级号' }]"
        />
      </div>

      <div>
        <van-field
          readonly
          clickable
          name="picker"
          :value="from.majorId"
          label="所属专业"
          placeholder="点击选择专业"
          @click="showPlace = true"
        />
        <van-popup v-model="showPlace" position="bottom">
          <van-picker
            show-toolbar
            title="选择专业"
            :columns="places"
            @confirm="onPlace"
            @cancel="showPlace = false"
          />
        </van-popup>
      </div>

      <div></div>
    </van-form>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
export default {
  name: "AddGrade",
  components: {
  },
  data() {
    return {
      places: [
        "计算机科学与技术",
        "软件工程",
        
      ],
      showPlace: false,
      from: {},
    };
  },
  created() {
    const that = this;
    let u = that.$jwt.inu(that);
    that.from.leaderId = u.id;
  },
  methods: {
    onPlace(value) {
      this.from.majorId = value;
      this.showPlace = false;
    },
    onSubmit() {
      const that = this;
      let from = that.from;
      let hasNull = that.$str.hasNull(from.name, from.number);

      if (hasNull) {
        that.$str.log("信息不完整");
      }

      this.$axios
        .post("/sims/grade/v1/add", this.from, {
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
