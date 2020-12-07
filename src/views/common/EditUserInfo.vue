<template>
  <div>
    <van-sticky>
      <van-nav-bar
        left-arrow
        left-text="返回"
        @click-left="onClickLeft"
        @click-right="onSubmit"
      >
        <template #title> 修改信息 </template>

        <template #left> </template>

        <template #right>
          <van-icon name="success" />
        </template>
      </van-nav-bar>
    </van-sticky>

    <van-form @submit="onSubmit">
      <div>
        <van-field
          v-model="from.username"
          name="昵称"
          label="昵称"
          placeholder="昵称"
        />
      </div>
      <div>
        <van-field name="radio" label="性别">
          <template #input>
            <van-radio-group v-model="from.sex" direction="horizontal">
              <van-radio name="1">男</van-radio>
              <van-radio name="2">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </div>
      <div>
        <van-field v-model="from.phone" label="电话" placeholder="电话" />
      </div>
      <div>
        <van-field v-model="from.email" label="邮箱" placeholder="邮箱" />
      </div>

      <div>
        <van-field
          readonly
          clickable
          name="currentDate"
          :value="from.birthDay"
          label="生辰"
          placeholder="点击选择"
          @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
          <van-datetime-picker
            title="选择时间"
            type="date"
            :min-date="minDate"
            :max-date="maxDate"
            :formatter="$date.formatter"
            @confirm="onConfirm"
            @cancel="showPicker = false"
          />
        </van-popup>
      </div>
      <div>
        <van-field
          readonly
          clickable
          name="area"
          :value="from.address"
          label="故乡"
          placeholder="点击选择省市区"
          @click="showArea = true"
        />

        <van-popup v-model="showArea" position="bottom">
          <van-area
            title="选择省市区"
            :area-list="citys"
            @confirm="getCity"
            @cancel="showArea = false"
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
  name: "EditUserInfo",
  components: {
  },
  data() {
    return {
      citys: [],
      showArea: false,
      value: "",
      showPicker: false,
      minDate: new Date(1950, 1, 1),
      maxDate: new Date(),
      avatar: [],
      from: {},
    };
  },
  created() {
    const that = this;
    setTimeout(() => {
      that.$jwt.user(that, (u) => {
        that.from = u;
      });
    }, 100);
    that.$http.get("/static/Citys.json").then(
      (res) => {
        that.citys = res.body;
      }
    );
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSubmit() {
      const that = this;
      that.$axios
        .post("/sims/user/v1/edit", that.from, {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.success) {
            Dialog.confirm({
              title: "提示",
              message: "修改成功",
            }).then(() => {});
          }
        });
    },

    getCity(values) {
      this.from.address = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join("/");
      this.showArea = false;
    },
    onConfirm(date) {
      this.from.birthDay = this.$date.format("YYYY-mm-dd", date);
      this.showPicker = false;
    },
  },
};
</script>

<style scoped>
</style>
