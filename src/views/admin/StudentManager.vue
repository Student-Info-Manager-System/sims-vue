<template>
  <div>
    <Top title="学生管理" />
    <div>
      <van-empty v-if="!$str.isNull(grades)" description="好清净啊" />
      <div v-else>
        <div>
          <van-sticky>
            <div v-if="!$str.isNull(actionGradeId)">
              <van-dropdown-menu>
                <van-dropdown-item
                  v-model="actionGradeId"
                  :options="gradeOptions"
                  @change="change()"
                />
              </van-dropdown-menu>
            </div>
          </van-sticky>
          <van-empty v-if="$str.isNull(students)" description="好清净啊" />
          <div v-else>
            <div>
              <van-search v-model="search" show-action placeholder="学号/姓名">
                <template #action>
                  <div @click="onSearch">搜索</div>
                </template>
              </van-search>
            </div>

            <van-list :finished="true" finished-text="没有更多了">
              <van-cell v-for="student in students">
                <van-card
                  :tag="student.position"
                  :title="student.name"
                  :desc="student.number"
                  :thumb="student.avatar"
                >
                  <template #footer>
                    <van-button
                      round
                      size="mini"
                      type="danger"
                      @click="dele(student)"
                      >删除</van-button
                    >
                    <van-button
                      round
                      size="mini"
                      type="warning"
                      @click="edit(student)"
                      >编辑</van-button
                    >
                    <van-button
                      round
                      size="mini"
                      type="primary"
                      @click="look(student)"
                      >详情</van-button
                    >
                  </template>
                </van-card>
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

    <van-popup
      v-model="showInfo"
      round
      closeable
      close-icon="close"
      position="bottom"
      :style="{ height: '80%' }"
    >
      <div v-if="showInfo">
        <div v-if="!$str.isNull(showUser)">
          <van-image
            round
            width="10rem"
            height="10rem"
            fit="cover"
            :src="checkNull(showUser.avatar)"
          >
          </van-image>
          <van-contact-card
            type="edit"
            :name="checkNull(showUser.name)"
            :tel="checkNull(showUser.phone)"
          />
          <van-cell
            :title="$str.isS(showUser.type) ? '学号' : '工号'"
            :value="checkNull(showUser.number)"
            icon="award-o"
          />

          <van-cell
            v-if="$str.isS(showUser.type)"
            title="职务"
            :value="checkNull(showUser.position)"
            icon="records"
          />

          <van-cell
            title="性别"
            :value="checkSex(showUser.sex)"
            icon="manager-o"
          />

          <van-cell
            title="昵称"
            :value="checkNull(showUser.username)"
            icon="label-o"
          />

          <van-cell
            title="住址"
            :value="checkNull(showUser.address)"
            icon="location-o"
          />

          <van-cell
            title="邮箱"
            :value="checkNull(showUser.email)"
            icon="envelop-o"
          />

          <van-cell
            title="生日"
            :value="checkNull(showUser.birthDay)"
            icon="gift-card-o"
          />
        </div>
      </div>
    </van-popup>

    <Menu :actity="2" />
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
      showInfo: false,
      showUser: null,
      search: "",
      actionGradeId: null,
      grades: null,
      gradeInfo: null,
      students: null,
      gradeOptions: [],
      actionUser: null,
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
    that.change();
  },
  methods: {
    change() {
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
          });
      }, 200);
    },
    look(item) {
      const that = this;
      that.showInfo = true;
      that.$axios
        .get("/sims/student/v1/findByNumber/" + item.number, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          that.showUser = res.data.data;
        });
    },
    edit(item) {
      const that = this;
      that.$router.push("editStudent/" + item.number);
    },
    dele(item) {
      const that = this;
      Dialog.confirm({
        title: "提示",
        message: "确定删除" + item.name + "吗",
      }).then(() => {
        that.$axios
          .get("/sims/student/v1/del/" + item.id, {
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
    checkNull(value) {
      const that = this;
      if (that.$str.isNull(value)) {
        return "无信息";
      }
      return value;
    },
    checkSex(value) {
      value = this.checkNull(value);
      if (value === "无信息") {
        return value;
      }
      if (value === "1") {
        value = "男";
      }
      if (value === "2") {
        value = "女";
      }
      return value;
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
</style>
