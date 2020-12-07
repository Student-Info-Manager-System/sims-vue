<template>
  <div>
    <Top title="课程管理" />
    <div>
      <van-empty v-if="$str.isNull(courses)" description="好清净啊" />
      <div v-else>
        <van-search v-model="search" show-action placeholder="课程号/课程名">
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>

        <van-list :finished="true" finished-text="没有更多了">
          <div v-for="item in courses">
            <van-swipe-cell>
              <template #left>
                <van-button
                  square
                  type="danger"
                  @click="dele(item)"
                  text="删除"
                />
              </template>
              <van-cell :title="item.name" />
              <template #right>
                <van-button
                  square
                  type="info"
                  @click="edit(item)"
                  text="修改"
                />
              </template>
            </van-swipe-cell>
          </div>
        </van-list>
      </div>
    </div>

    <Menu :actity="3" />
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import Menu from "@/components/common/Menu.vue";
import Top from "@/components/common/Top.vue";

export default {
  name: "CourseManager",
  components: {
    Menu,
    Top,
  },
  data() {
    return {
      courses: null,
    };
  },
  created() {
    const that = this;
    let u = that.$jwt.login(that);
    that.$axios
      .get("/sims/course/v1/super-list", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        that.courses = res.data.data;
      });
  },
  methods: {
    onSearch() {},

    edit(item) {
      const that = this;
      that.$router.push("editCourse/" + item.id + "/" + item.name);
    },
    dele(item) {
      const that = this;
      Dialog.confirm({
        title: "提示",
        message: "确定删除" + item.name + "吗",
      }).then(() => {
        that.$axios
          .get("/sims/course/v1/super-remove/" + item.id, {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          })
          .then(() => {
            Toast.success("操作成功!");
            that.$router.go(0);
          });
      });
    },
  },
};
</script>

<style scoped>
</style>
