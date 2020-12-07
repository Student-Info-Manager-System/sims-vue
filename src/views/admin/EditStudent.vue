
<template>
  <div>
    <van-sticky>
      <van-nav-bar
        left-arrow
        left-text="返回"
        title="修改学生信息"
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
          label="姓名"
          placeholder="姓名"
          :rules="[{ required: true, message: '请填写学生姓名' }]"
        />
      </div>

      <div>
        <van-field
          v-model="from.number"
          label="学号"
          placeholder="学号"
          :rules="[{ required: true, message: '请填写学生学号' }]"
        />
      </div>
      <div>
        <van-field
          readonly
          clickable
          name="picker"
          :value="from.position"
          label="职位"
          placeholder="点击选择职位"
          @click="showPosition = true"
        />
        <van-popup v-model="showPosition" position="bottom">
          <van-picker
            show-toolbar
            title="授予学生职位"
            :columns="positions"
            @confirm="onPosition"
            @cancel="showPosition = false"
          />
        </van-popup>
      </div>
      <div>
        <van-field
          readonly
          clickable
          name="picker"
          :value="from.gradeId"
          label="班级"
          placeholder="点击选择班级"
          @click="showGrade = true"
        />
        <van-popup v-model="showGrade" position="bottom">
          <van-picker
            show-toolbar
            title="选择学生班级"
            :columns="grades"
            @confirm="onGrade"
            @cancel="showGrade = false"
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
  name: "EditStudent",
  components: {
    [Toast.name]: Toast,
  },
  data() {
    return {
      positions: ["学生", "团支部", "班长", "学习委员"],
      grades: [],
      gradeList: [],
      showPosition: false,
      showGrade: false,
      from: {},
    };
  },
  created() {
    const that = this;
    let number = that.$route.params.number;
    let u = that.$jwt.login(that)
    setTimeout(() => {
      that.$jwt.getUser(that, that.$c.S, number, (v) => {
        that.from = v;
      });
    }, 100);
    that.$axios
      .get("/sims/grade/v1/findInfoByUserId/" + u.type + "/" + u.id, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        that.gradeList = res.data.data;
        for (let i in that.gradeList) {
          that.grades[i] = that.gradeList[i].name;
        }
      });
  },
  methods: {
    onSubmit() {
      const that = this;
      let from = that.from;
      let hasNull = that.$str.hasNull(from.name, from.number);

      if (hasNull) {
        that.$str.log("信息不完整");
      }
      for (let i in that.gradeList) {
        if (that.$str.equal(that.gradeList[i].name, that.from.gradeId)) {
          that.from.gradeId = that.gradeList[i].id;
        }
      }
      this.$axios
        .post("/sims/student/v1/editStudent", this.from, {
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
    onPosition(value) {
      this.from.position = value;
      this.showPosition = false;
    },
    onGrade(value) {
      this.from.gradeId = value;
      this.showGrade = false;
    },
  },
};
</script>

<style scoped>
</style>
