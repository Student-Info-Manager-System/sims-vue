<template>
  <div>
    <div>
      <van-sticky>
        <van-nav-bar
          right-text="更多"
          left-arrow
          :title='showTitle'
          @click-right="showShare = true"
        >
         
        </van-nav-bar>
      </van-sticky>
    </div>

    <van-share-sheet
      v-model="showShare"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script>
export default {
  name: "Top",
  props: {
    title: '',
  },
  data() {
    return {
        showTitle: '',
      showShare: false,
      options: [],
    };
  },
  created(){
    setTimeout(() => {
      const that = this
      let type = that.$jwt.type(that)

      if (that.$str.isNull(type)) {
        type = 0;
      }
      that.showTitle = that.title
      that.$http.get("/static/options.json").then((res) => {
          that.options = res.body[type];
        }
      );
    }, 10);
      
      
  },
  methods: {
    onSelect(option) {
      const that = this;
      that.showShare = false;
      if (option.url === "logout") {
        that.$jwt.logout(that);
        return;
      } else {
        that.$router.push(option.url)
            setTimeout(() => {
                that.$router.go(0);
            }, 100)
      }
    },
  },
};
</script>

<style scoped>
</style>
