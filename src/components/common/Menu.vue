<template>
  <div>
    <van-tabbar v-model="active" @change="onChange(menus, active, 10)">
      <van-tabbar-item
        v-for="item in menus"
        :icon="item.icon"
        replace
        :to="item.url"
      >
        {{ item.title }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
    import {Toast} from 'vant';
export default {
  name: "Menu",
  props: {
    actity: 0,
  },
  components: {
      [Toast.name]: Toast,
  },
  data() {
    return {
      active: 0,
      menus: [],
    };
  },
  methods: {
    onChange(menu, active, time) {
      Toast.loading({
        message: menu[active].title + "...",
        forbidClick: true,
        loadingType: "circular",
        duration: time,
      });
    },
  },
  created() {
    setTimeout(() => {
      const that = this;
      let type = that.$jwt.type(that);
      if (that.$str.isNull(type)) {
        type = 0;
      }
      that.active = that.actity;
      that.$http.get("/static/menu.json").then((res) => {
          that.menus = res.body[type];
        }
      );
    }, 10);
  },
};
</script>

<style scoped>
</style>
