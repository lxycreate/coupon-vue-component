<template>
  <div id="app">
    <HeaderComponent ref="HeaderComponent"></HeaderComponent>
  </div>
</template>
<script>
import HeaderComponent from "./components/header.vue";
import Velocity from "velocity-animate";

export default {
  name: "app",
  components: {
    HeaderComponent
  },
  props: {},
  data: function() {
    return {
      // 存储ajax参数的对象
      ajax_pars: {},
      // 可以进行ajax请求的标志
      can_ajax: true
    };
  },
  created: function() {
    this.listenScrollUpDown();
  },
  methods: {
    // 监听上下滚动事件
    listenScrollUpDown: function() {
      var app = this;
      window.onscroll = function() {
        // 滚动条距离顶部的高度
        var scroll_top =
          document.documentElement.scrollTop || window.pageYOffset;
        //  获取屏幕可是宽度
        var client_width = document.documentElement.clientWidth;
        // 搜索框吸顶  start
        if (scroll_top < 100) {
          app.$refs.HeaderComponent.unfixedSearchInput();
          app.$refs.HeaderComponent.showLogo();
        }
        if (client_width >= 992 && scroll_top >= 100) {
          app.$refs.HeaderComponent.fixedSearchInput();
          app.$refs.HeaderComponent.showLogo();
        }
        if (client_width < 992 && scroll_top > 120) {
          app.$refs.HeaderComponent.fixedSearchInput();
          app.$refs.HeaderComponent.hideLogo();
        }
        // 搜索框吸顶   end
      };
    },
    // 向ajax_pars中添加参数
    addProperty: function(pro_name, pro_value) {
      if (pro_name != undefined && pro_value != undefined && this.can_ajax) {
        // loadGoods(pro_name);
      }
    },
    // 从ajax_pars中删除属性
    deleteProperty: function(pro_name) {
      if (this.ajax_pars.hasOwnProperty(pro_name) && this.can_ajax) {
        delete this.ajax_pars[pro_name];
        // loadGoods(pro_name);
      }
    }
  }
  //
};
</script>