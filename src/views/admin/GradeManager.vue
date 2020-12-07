<template>
  <div>
    <Top title="班级管理" />
    <div>
      <van-empty v-if="$str.isNull(grades)" description="好清净啊" />
      <div v-else>
        <van-search v-model="search" show-action placeholder="班级号/班级名">
          <template #action>
            <div @click="onSearch">搜索</div>
          </template>
        </van-search>

        <van-list :finished="true" finished-text="没有更多了">
          <div v-for="item in grades">
            <van-swipe-cell>
              <template #left>
                <van-button
                  square
                  type="info"
                  @click="edit(item)"
                  text="修改"
                />
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
                  type="primary"
                  @click="openPutNotic(item)"
                  text="发布公告"
                />
              </template>
            </van-swipe-cell>
          </div>
        </van-list>
      </div>
    </div>

    <Menu :actity="1" />

    <van-popup v-model="showNotice" position="top" :style="{ height: '20%' }">
      <van-cell-group>
        <van-field
          v-model="notice.notice"
          type="textarea"
          placeholder="公告"
          maxlength="255"
          show-word-limit
        />
      </van-cell-group>

      <van-button type="primary" @click="putNotice">发布</van-button>
      <van-button plain type="primary" @click="showNotice = false"
        >取消</van-button
      >
    </van-popup>
  </div>
</template>

<script>
import { Dialog, Toast } from "vant";
import Menu from "@/components/common/Menu.vue";
import UserInfo from "@/components/common/UserInfo.vue";
import Top from "@/components/common/Top.vue";

export default {
  name: "GradeManager",
  components: {
    Menu,
    UserInfo,
    Top,
  },
  data() {
    return {
      search: "",
      actionNames: [],
      grades: [],
      showNotice: false,
      notice: {
        gradeId: "",
        notice: "",
      },
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
        that.grades = res.data.data;
      });
  },
  methods: {
    edit(item) {
      const that = this;
      that.$router.push("editGrade/"+item.id + '/' + item.name);
    },
    dele(item) {
      const that = this;
      Dialog.confirm({
        title: "提示",
        message: "确定删除" + item.name + "吗",
      }).then(() => {
        that.$axios
          .get("/sims/grade/v1/super-remove/" + item.id, {
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
    openPutNotic(grade) {
      const that = this;
      that.showNotice = true;
      that.notice.gradeId = grade.id;
    },
    putNotice() {
      const that = this;
      if (that.$str.hasNull(that.notice.gradeId)) {
        Toast.fail("发布失败");
        return;
      }

      that.$axios
        .post("/sims/grade/v1/notice", that.notice, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then(() => {
          if (that.$str.hasNull(that.notice)) {
            Toast.fail("公告已置空");
          } else {
            Toast.success("成功");
          }
        });
      that.showNotice = false;
    },
    onSearch() {},
  },
};
</script>

<style scoped>
</style>
