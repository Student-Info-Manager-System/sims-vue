<template>
  <div>
    <Top title="我的班级" />
    <GradeInfo :id="grade.id" />
    <Menu :actity="2" />
  </div>
</template>

<script>
import GradeInfo from "@/components/student/GradeInfo.vue";
import Menu from "@/components/common/Menu.vue";
import Top from "@/components/common/Top.vue";

export default {
  name: "MyGrade",
  components: {
    Menu,
    Top,
    GradeInfo,
  },
  data() {
    return {
      grade: {},
      student: null,
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
        that.student = res.data.data;
      });
    setTimeout(()=>{
      that.$axios
      .get("/sims/grade/v1/findInfoById/" + that.student.gradeId, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        that.grade = res.data.data;
      });
    }, 200)
  },
  methods: {},
};
</script>

<style scoped>
</style>
