<template>
  <div>
    <van-sticky>
      <van-nav-bar
        left-arrow
        left-text="返回"
        title="班级课表"
        @click-left="onClickLeft"
      >
      </van-nav-bar>
    </van-sticky>
    <div>
      <van-empty v-if="$str.isNull(timeTable)" description="好清净啊" />
      <div v-else>
        <van-search v-model="search" show-action placeholder="课程名/上课时间">
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>
        <div>
          <van-grid :column-num="2">
            <van-grid-item :v-for="item in timeTable" :text="item.name" />
          </van-grid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TimeTable",
  components: {},
  data() {
    return {
      timeTable: [],
      tables: [],
      search: '',
    };
  },
  created() {
    const that = this;
    let u = that.$jwt.login(that);
    that.$axios
      .get("/sims/timetable/v1/table", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        that.timeTable = res.data.data;
      });
  },
  methods: {
    onSearch(){

    },
    onClickLeft() {
      this.$router.go(-1);
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
