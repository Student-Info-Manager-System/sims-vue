<template>
  <div>
    <Top title="首页" />
    <div>
      <van-pull-refresh
        v-model="isLoading"
        :head-height="80"
        success-text="刷新成功"
        @refresh="onRefresh"
      >
        <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
        <template #pulling="props">
          <img
            class="doge"
            src="https://img.yzcdn.cn/vant/doge.png"
            :style="{ transform: `scale(${props.distance / 80})` }"
          />
        </template>
        <!-- 释放提示 -->
        <template #loosing>
          <img class="doge" src="https://img.yzcdn.cn/vant/doge.png" />
        </template>

        <!--加载提示-->
        <template #loading>
          <img class="doge" src="https://img.yzcdn.cn/vant/doge-fire.jpg" />
        </template>

        <div id="weather-v2-plugin-simple"></div>

        <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
          <van-swipe-item>
            <img
              style="width: 360px"
              src="https://api.ixiaowai.cn/gqapi/gqapi.php"
            />
          </van-swipe-item>
          <van-swipe-item>
            <img
              style="width: 360px"
              src="https://api.ixiaowai.cn/gqapi/gqapi.php"
          /></van-swipe-item>
        </van-swipe>
      </van-pull-refresh>

      
    </div>
    <Menu :actity="0" />
  </div>
</template>

<script>
import Menu from "@/components/common/Menu.vue";
import Top from "@/components/common/Top.vue";

export default {
  name: "Home",
  components: {
    Menu,
    Top,
  },
  data() {
    return {
      /**
       * 加载中间变量
       */
      isLoading: false,
    };
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    },
  },
};
</script>


<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 30vh;
  text-align: center;
  background-color: #fff;
}

.doge {
  width: 140px;
  height: 72px;
  margin-top: 8px;
  border-radius: 4px;
}
</style>
