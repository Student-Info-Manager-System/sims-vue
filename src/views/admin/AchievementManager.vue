<template>
  <div>
    <Top title="学生成绩管理" />
    <div>
      <van-empty v-if="!$str.isNull(grades)" description="好清净啊" />
      <div v-else>
        <div>
          <van-sticky>
            <div
              v-if="!$str.isNull(actionGradeId) && !$str.isNull(actionCourseId)"
            >
              <van-dropdown-menu>
                <van-dropdown-item
                  v-model="actionGradeId"
                  :options="gradeOptions"
                  @change="changeStu()"
                />
                <van-dropdown-item
                  v-model="actionCourseId"
                  :options="courseOptions"
                  @change="changeCour()"
                />
              </van-dropdown-menu>
            </div>
          </van-sticky>

          <van-empty v-if="$str.isNull(courses)" description="好清净啊" />
          <div v-else>
            <van-empty v-if="$str.isNull(students)" description="好清净啊" />
            <div v-else>
              <div>
                <van-search
                  v-model="search"
                  show-action
                  placeholder="学号/姓名"
                >
                  <template #action>
                    <div @click="onSearch">搜索</div>
                  </template>
                </van-search>
              </div>

              <van-list :finished="true" finished-text="没有更多了">
                <van-cell v-for="student in students">
                  <van-cell
                    :title="student.name"
                    :label="'分数:' + getScore(student.id)"
                  >
                    <template #default>
                      <van-button type="default" @click="setScore(student)"
                        >打分</van-button
                      >
                    </template>
                  </van-cell>
                </van-cell>
              </van-list>
              <van-divider
                :style="{
                  color: '#1989fa',
                  borderColor: '#1989fa',
                  padding: '0 16px',
                }"
              >
                <van-icon name="smile-o" />
                <van-icon name="smile" />
                <van-icon name="smile-o" />
              </van-divider>
            </div>
          </div>
        </div>
      </div>
    </div>

    <van-popup v-model="showScore" position="top" :style="{ height: '20%' }">
      <van-cell-group>
        <van-field v-model="actionScore" label="分数" :placeholder="actionScore" />
      </van-cell-group>

      <van-slider v-model="actionScore" active-color="#ee0a24">
        <template #button>
          <div class="custom-button">{{ actionScore }}</div>
        </template>
      </van-slider>

      <van-button type="primary" @click="putScore">打分</van-button>
      <van-button plain type="primary" @click="showScore = false"
        >取消</van-button
      >
    </van-popup>

    <Menu :actity="4" />
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import Menu from "@/components/common/Menu.vue";
import Top from "@/components/common/Top.vue";

export default {
  name: "StudentManager",
  components: {
    Menu,
    Top,
  },
  data() {
    return {
      search: "",

      grades: null,
      courses: null,
      gradeInfo: null,
      students: null,
      gradeOptions: [],
      actionGradeId: null,
      courseOptions: [],
      actionCourseId: null,
      actionUser: null,
      actionScore: 0,
      showScore: false,
      actionStudentid: null,
      scoures: null,
    };
  },
  created() {
    const that = this;
    let u = that.$jwt.login(that);
    that.$axios
      .get("/sims/grade/v1/findInfoByUserId/" + u.type + "/" + u.id, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        let grades = res.data.data;
        for (let i in grades) {
          let v = {
            text: grades[i].name,
            value: grades[i].id,
          };
          that.gradeOptions[i] = v;
        }
        that.actionGradeId = grades[0].id;
      });
    setTimeout(() => {
      that.$axios
        .get("/sims/course/v1/getByGradeId/" + that.actionGradeId, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          let courses = res.data.data;
          that.courses = courses;
          for (let i in courses) {
            let v = {
              text: courses[i].name,
              value: courses[i].id,
            };
            that.courseOptions[i] = v;
          }
          that.actionCourseId = courses[0].id;
        });
    }, 300);
    that.changeStu();
    that.changeCour();
  },
  methods: {
    putScore() {
      const that = this;

      that.$axios
        .get(
          "/sims/achievement/v1/putScore/" +
            "/" +
            that.actionCourseId +
            "/" +
            that.actionStudentid +
            "/" +
            that.actionScore,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          Toast.success("成功");
          that.showScore = false;
          that.$router.go(0);
        });
    },
    setScore(item) {
      const that = this;
      let score = 0;
      for (let i in that.courses) {
        if ((that.courses[i].id = that.actionCourseId)) {
          score = that.courses[i].credit;
        }
      }
      that.actionStudentid = item.id;
      that.showScore = true;
    },
    getActionScore() {
      const that = this;
      let score = 0;
      for (let i in that.courses) {
        if ((that.courses[i].id = that.actionCourseId)) {
          score = that.courses[i].credit;
        }
      }
      return score;
    },
    getActionScoreTime() {
      const that = this;
      let time = "";
      for (let i in that.courses) {
        if ((that.courses[i].id = that.actionCourseId)) {
          time = that.courses[i].createTime;
        }
      }
      return time;
    },
    checkNull(value) {
      const that = this;
      if (that.$str.isNull(value)) {
        return "0";
      }
      return value;
    },
    changeStu() {
      const that = this;
      setTimeout(() => {
        that.$axios
          .get("/sims/grade/v1/findStudentInfoById/" + that.actionGradeId, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            that.gradeInfo = res.data.data;
            that.students = that.gradeInfo.students;
            for (let i in that.students) {
              that.students[i].score = 0;
            }
          });
      }, 200);
      setTimeout(() => {
        that.$axios
          .get("/sims/course/v1/getByGradeId/" + that.actionGradeId, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            let courses = res.data.data;
            that.courses = courses;
            for (let i in courses) {
              let v = {
                text: courses[i].name,
                value: courses[i].id,
              };
              that.courseOptions[i] = v;
            }
            that.actionCourseId = courses[0].id;
          });
      }, 300);
    },
    changeCour() {
      const that = this;
      setTimeout(() => {
        that.$axios
          .get(
            "/sims/achievement/v1/getStudentScore/" +
              that.actionGradeId +
              "/" +
              that.actionCourseId,
            {
              headers: {
                Authorization: localStorage.getItem("token"),
              },
            }
          )
          .then((res) => {
            that.scoures = res.data.data;
          });
      }, 500);
    },
    getScore(id) {
      const that = this;
      for (let i in that.scoures) {
        if (id === that.scoures[i].id) {
          let se = that.scoures[i].score;

          return se;
        }
      }
      return "未打分";
    },
    onSearch() {
      const that = this;
      if (that.$str.isNull(that.search)) {
        that.$router.go(0);
        return;
      }
      that.$axios
        .get("/sims/student/v1/search/" + that.search, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          that.students = res.data.data;
        });
    },
  },
};
</script>

<style scoped>
.custom-button {
  margin: 50px;
    width: 26px;
    color: #fff;
    font-size: 10px;
    line-height: 100px;
    text-align: center;
    background-color: #ee0a24;
    border-radius: 100px;
  }
</style>
