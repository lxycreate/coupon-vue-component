<template>
  <div id="app">
    <HeaderComponent ref="HeaderComponent"/>
    <MiddleComponent ref="MiddleComponent"/>
    <FooterComponent/>
  </div>
</template>
<script>
import HeaderComponent from "./components/header.vue";
import MiddleComponent from "./components/middle.vue";
import FooterComponent from "./components/footer.vue";
import Velocity from "velocity-animate";

export default {
  name: "App",
  components: {
    HeaderComponent,
    MiddleComponent,
    FooterComponent
  },
  props: {},
  data: function() {
    return {};
  },
  created: function() {
    window.scrollTo(0, 0);
  },
  mounted: function() {
    this.listenScrollUpDown();
    if (!this.$refs.HeaderComponent.initSearch()) {
      this.$refs.MiddleComponent.loadGoods("");
    }
  },
  methods: {
    // 监听上下滚动事件
    listenScrollUpDown: function() {
      window.onscroll = () => {
        // 滚动条距离顶部的高度
        var scroll_top =
          document.documentElement.scrollTop || window.pageYOffset;
        //  获取屏幕可是宽度
        var client_width = document.documentElement.clientWidth;
        // 搜索框吸顶  start
        // 解除吸顶
        if (scroll_top < 100) {
          this.$refs.HeaderComponent.unfixedSearchInput();
        }
        // 大屏幕搜索框吸顶
        if (client_width >= 992 && scroll_top >= 100) {
          this.$refs.HeaderComponent.fixedSearchInputLarge();
        }
        // 小屏幕搜索框吸顶
        if (client_width < 992 && scroll_top > 120) {
          this.$refs.HeaderComponent.fixedSearchInputSmall();
        }
        // 搜索框吸顶   end

        // 滚动到底部加载更多数据   start
        // 可视区的高度
        var window_height = document.documentElement.clientHeight;
        //滚动条的总高度
        var scroll_height = document.documentElement.scrollHeight;
        if (scroll_top + window_height + 1 >= scroll_height) {
          this.$refs.MiddleComponent.loadNextPage();
        }
        // 滚动到底部加载更多数据   end
        // 滚动到顶部   start
        if (scroll_top > window_height) {
          this.$refs.MiddleComponent.showToTop();
        } else {
          this.$refs.MiddleComponent.hideToTop();
        }
        // 滚动到顶部   end
      };
    }
    //
  }
  //
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  font-family: "微软雅黑";
}

ul,
li {
  list-style: none;
}

#app {
  position: relative;
  margin: auto;
}
</style>
