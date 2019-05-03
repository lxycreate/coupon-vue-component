<template>
  <div id="detail">
    <HeaderComponent ref="HeaderComponent"/>
    <DetailMiddle ref="DetailMiddle"/>
    <FooterComponent/>
  </div>
</template>
<script>
import HeaderComponent from "./components/header.vue";
import DetailMiddle from "./components/detailMiddle.vue";
import FooterComponent from "./components/footer.vue";
import Velocity from "velocity-animate";

export default {
  name: "Detail",
  components: {
    HeaderComponent,
    DetailMiddle,
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
        // 可视区的高度
        var window_height = document.documentElement.clientHeight;
        // 滚动到顶部   start
        if (scroll_top > window_height) {
          this.$refs.DetailMiddle.showToTop();
        } else {
          this.$refs.DetailMiddle.hideToTop();
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
