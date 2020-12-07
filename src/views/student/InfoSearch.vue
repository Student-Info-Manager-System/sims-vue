<template>
  <div>
    <Top title="成绩查询" />

    <div>
      <van-empty v-if="$str.isNull(scores)" description="描述文字" />
      <div v-else>
        <div>
          <van-search v-model="search" show-action placeholder="课程名">
            <template #action>
              <div @click="onSearch">搜索</div>
            </template>
          </van-search>
        </div>

        <van-cell-group>
          <van-cell
            v-for="score in scores"
            :title="score.name"
            :value="getScore(score.score)"
            size="large"
          />
        </van-cell-group>
      </div>
    </div>

    <Menu :actity="1" />
  </div>
</template>

<script>
import Menu from "@/components/common/Menu.vue";
import Top from "@/components/common/Top.vue";

export default {
  name: "InfoSearch",
  components: {
    Menu,
    Top,
  },
  data() {
    return {
      search: "",
      scores: [],
    };
  },
  created() {
    const that = this;
    let u = that.$jwt.login(that);
    that.$axios
      .get("/sims/achievement/v1/findStudentAchievement/" + u.id, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        that.scores = res.data.data;
      });
  },
  methods: {
    getScore(s){
        if (s < 60){
          return '不及格'
        } return s + '分'
    },
    onSearch() {
      const that = this;
      let search = that.search;
      if (that.$str.isNull(search)) {
        that.$router.go(0);
        return;
      }
      let u = that.$jwt.login(that);
      that.$axios
        .get(
          "/sims/achievement/v1/findStudentAchievement/" + u.id + "/" + search,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          that.scores = res.data.data;
        });
    },
  },
};
</script>

<style scoped>
</style>
