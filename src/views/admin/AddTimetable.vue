<template>
  <div>
    <van-sticky>
      <van-nav-bar
        left-arrow
        left-text="返回"
        title="班级排课"
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
          v-model="from.teacher"
          label="授课教师"
          placeholder="授课教师名"
          :rules="[{ required: true, message: '请填写授课教师名' }]"
        />
      </div>

      <div>
        <van-field
          readonly
          clickable
          name="calendar"
          :value="from.teachTime"
          label="授课时间"
          placeholder="点击选择授课时间"
          @click="showTime = true"
        />

        <van-popup v-model="showTime" position="bottom">
          <van-area
            title="选择授课时间"
            :area-list="times"
            @confirm="getTime"
            @cancel="showTime = false"
          />
        </van-popup>
      </div>

      <div>
        <van-field
          readonly
          clickable
          name="picker"
          :value="from.teachPosition"
          label="授课地点"
          placeholder="点击选择授课地点"
          @click="showPlace = true"
        />
        <van-popup v-model="showPlace" position="bottom">
          <van-picker
            show-toolbar
            title="选择授课地点"
            :columns="places"
            @confirm="onPlace"
            @cancel="showPlace = false"
          />
        </van-popup>
      </div>

      <div>
        <van-field
          readonly
          clickable
          name="picker"
          :value="from.gradeId"
          label="授课班级"
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

      <div>
        <van-field
          readonly
          clickable
          name="picker"
          :value="from.courseId"
          label="课程"
          placeholder="点击选择课程"
          @click="showCourse = true"
        />
        <van-popup v-model="showCourse" position="bottom">
          <van-picker
            show-toolbar
            title="选择课程"
            :columns="courses"
            @confirm="onCourse"
            @cancel="showCourse = false"
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
  name: "AddTimetable",
  components: {
  },
  data() {
    return {
      places: [
        "生科楼114",
        "生科楼109",
        "科技楼305",
        "科技楼405",
        "科技楼501",
        "化学楼201",
        "化学楼302",
        "同大201",
        "同大202",
        "同大203",
        "同大204",
        "同大205",
      ],
      grades: [],
      courses: [],
      courseList: [],
      gradeList: [],
      showPlace: false,
      showTime: false,
      showGrade: false,
      showCourse: false,
      from: {},
      times: [],
    };
  },
  created() {
    const that = this;
    let u = that.$jwt.inu(that);
    that.$http.get("/static/TeachTime.json").then((res) => {
      that.times = res.body;
    });
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
    that.$axios
      .get("/sims/course/v1/super-list", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        that.courseList = res.data.data;
        console.log(res);
        for (let i in that.courseList) {
          that.courses[i] = that.courseList[i].name;
        }
      });
  },
  methods: {
    onSubmit() {
      const that = this;
      let from = that.from;
      for (let i in that.gradeList)
        if (that.$str.equal(that.gradeList[i].name, that.from.gradeId))
          that.from.gradeId = that.gradeList[i].id;
      for (let i in that.courseList)
        if (that.$str.equal(that.courseList[i].name, that.from.courseId))
          that.from.courseId = that.courseList[i].id;
      let hasNull = that.$str.isEmpty(from);

      if (hasNull) {
        that.$str.log("信息不完整");
      }
      
      console.log(that.from);
      that.$axios
        .post("/sims/timetable/v1/add", that.from, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          Toast.success("操作成功!");
          that.$router.go(-1);
        });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    onPlace(value) {
      this.from.teachPosition = value;
      this.showPlace = false;
    },
    onGrade(value) {
      this.from.gradeId = value;
      this.showGrade = false;
    },
    onCourse(value) {
      this.from.courseId = value;
      this.showCourse = false;
    },
    getTime(values) {
      this.from.teachTime = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      this.showTime = false;
    },
  },
};
</script>

<style scoped>
</style>
