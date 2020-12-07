<template>
  <div>
    <div>
      <Top title="课程安排" />
    </div>
    <div>
      <van-empty v-if="$str.isNull(timeTable)" description="好清净啊" />
      <div v-else>
        <van-search v-model="search" show-action placeholder="课程名/上课时间">
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
        <div>
          <van-cell-group>
            <van-cell
              v-for="item in timeTable"
              :value="item.teachTime"
              :label="item.teachPosition"
            >
              <template #title>
                <span class="custom-title">{{ item.name }}</span>
                <van-tag type="danger">{{ item.teacher }}</van-tag>
              </template>
            </van-cell>
          </van-cell-group>
        </div>
      </div>
    </div>

    <Menu :actity="3" />
  </div>
</template>

<script>
import Menu from "@/components/common/Menu.vue";
import Top from "@/components/common/Top.vue";
export default {
  name: "StudentTable",
  components: {
    Menu,

    Top,
  },
  data() {
    return {
      search: "",
      showPopover: false,
      timeTable: null,
      tables: [],
      grade: null,
    };
  },
  created() {
    const that = this;
    let u = that.$jwt.login(that);

    that.$axios
      .get("/sims/student/v1/getSysUserId/" + u.id, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        let student = res.data.data;
        setTimeout(() => {
          that.$axios
            .get("/sims/grade/v1/findInfoById/" + student.gradeId, {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            })
            .then((res) => {
              that.grade = res.data.data;
            });
        }, 100);
      });

    setTimeout(() => {
      that.$axios
        .get("/sims/timetable/v1/table/" + that.grade.id, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          that.timeTable = res.data.data;
        });
    }, 500);
  },
  methods: {
    onSearch() {
      const that = this;
      if (that.$str.isNull(that.search)) {
        that.$router.go(0);
        return;
      }
      that.$axios
        .get("/sims/timetable/v1/table/" + that.grade.id +'/' + that.search, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          that.timeTable = res.data.data;
        });
    },
    onClickLeft() {
    },
    getCourse(courseId) {
      const that = this;
      let course = null;
      that.$axios
        .get("/sims/course/v1/super-get-no-filter/" + courseId, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          course = res.data.data;
        });
      return course;
    },
  },
};
</script>

<style scoped>
</style>
