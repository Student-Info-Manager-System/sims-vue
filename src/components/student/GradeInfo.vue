<template>
  <div>
    <Notice :text="grade.notice" />
    <van-collapse v-model="actionNames">
      <div>
        <div @click="show.leader = !show.leader">
          <van-sticky>
            <van-collapse-item size="large" title="班主任" name="teacher" />
          </van-sticky>
        </div>

        <div v-if="show.leader">
          <van-card
            tag="班主任"
            :title="leader.name"
            :desc="leader.number"
            :thumb="leader.avatar"
          >
          </van-card>
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

      <div>
        <div @click="show.students = !show.students">
          <van-sticky>
            <van-collapse-item size="large" title="班级学生" name="students" />
          </van-sticky>
        </div>

        <div v-if="show.students">
          <van-list :finished="true" finished-text="没有更多了">
            <van-cell v-for="student in grade.students">
              <van-card
                :tag="student.position"
                :title="student.name"
                :desc="student.number"
                :thumb="student.avatar"
              >
                <template #footer>
                  <van-button size="small">
                    <van-icon name="good-job-o" />
                  </van-button>
                  <van-button size="small" @click="lookInfo(student.number)">
                    <van-icon name="ellipsis" />
                  </van-button>
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

      <div>
        <div @click="show.courses = !show.courses">
          <van-sticky>
            <van-collapse-item size="large" title="班级课程" name="courses" />
          </van-sticky>
        </div>

        <div v-if="show.courses">
          <van-list :finished="true" finished-text="没有更多了">
            <van-cell v-for="course in grade.courses">
              <van-card
                :tag="course.learnTime + '学时'"
                :title="course.name"
                :desc="course.number"
                thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
              >
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
    </van-collapse>
    <div v-if="infoShow">
      <van-popup
        v-model="infoShow"
        position="bottom"
        :style="{ height: '80%' }"
        closeable
        close-icon="close"
      >
        <div>
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
      </van-popup>
    </div>
  </div>
</template>

<script>
import Notice from "@/components/student/Notice.vue";

export default {
  name: "GradeInfo",
  components: {
    Notice,
  },
  props: {
    id: null,
  },
  data() {
    return {
      grade: {},
      leader: {},
      show: {
        leader: false,
        students: false,
        courses: false,
      },
      actionNames: [],

      infoShow: false,
      showUser: null,
    };
  },

  created() {
    const that = this;
    setTimeout(() => {
      that.$axios
        .get("/sims/grade/v1/findInfoById/" + that.id, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          that.grade = res.data.data;
          that.leader = that.grade.leader;
        });
    }, 300);
  },
  mounted() {},
  methods: {
    lookInfo(number) {
      const that = this;
      let u = that.$jwt.inu(that);

      setTimeout(() => {
        that.$jwt.getUser(that, u.type, number, (v) => {
          that.showUser = v;
        });
      }, 100);
      setTimeout(() => {
        if (!that.$str.isNull(that.showUser)) {
          that.infoShow = true;
        }
      }, 200);
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
  },
};
</script>

<style scoped>
</style>
