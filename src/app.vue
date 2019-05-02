<template>
  <div id="app">
    <HeaderComponent ref="HeaderComponent"/>
    <MiddleComponent/>
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
    return {
    };
  },
  created: function() {
  },
  mounted:function(){
    this.listenScrollUpDown();
  },
  methods: {
    // 监听上下滚动事件
    listenScrollUpDown: function() {
      var _self = this;
      window.onscroll = function() {
        // 滚动条距离顶部的高度
        var scroll_top =
          document.documentElement.scrollTop || window.pageYOffset;
        //  获取屏幕可是宽度
        var client_width = document.documentElement.clientWidth;
        // 搜索框吸顶  start
        // 解除吸顶
        if (scroll_top < 100) {
          _self.$refs.HeaderComponent.unfixedSearchInput();
        }
        // 大屏幕搜索框吸顶
        if (client_width >= 992 && scroll_top >= 100) {
          _self.$refs.HeaderComponent.fixedSearchInputLarge();
        }
        // 小屏幕搜索框吸顶
        if (client_width < 992 && scroll_top > 120) {
          _self.$refs.HeaderComponent.fixedSearchInputSmall();
        }
        // 搜索框吸顶   end
      };
    },
    
  }
  //
};
</script>