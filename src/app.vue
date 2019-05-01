<template>
  <div id="app">
    <HeaderComponent ref="HeaderComponent"/>
    <MiddleComponent :goods_list="goods_list"/>
  </div>
</template>
<script>
import HeaderComponent from "./components/header.vue";
import MiddleComponent from "./components/middle.vue";
import Velocity from "velocity-animate";

export default {
  name: "App",
  components: {
    HeaderComponent,
    MiddleComponent
  },
  props: {},
  data: function() {
    return {
      // 存储ajax参数的对象
      ajax_pars: {},
      // 当前页码
      page_num: 1,
      // 每页数据量
      page_size: 20,
      // 可以进行ajax请求的标志
      can_ajax: true,
      // 商品列表
      goods_list: [
        {
          name: "123"
        }
      ]
    };
  },
  created: function() {
    app = this;
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
    // 初始化ajax_pars
    initAjaxPars: function() {
      this.page_num = 1;
      this.addPropertyNoAjax({
        page_num: this.page_num,
        page_size: this.page_size
      });
      //特惠商品
      if (now_page_name == "bargain") {
        this.addPropertyNoAjax({ end_price: 10 });
      }
      //百元精品
      if (now_page_name == "hundred") {
        this.addPropertyNoAjax({ end_price: 100 });
      }
    },
    // 重置ajax_pars
    resetAjaxPars: function() {
      var temp = this.ajax_pars["sort"];
      var word = this.ajax_pars["word"];
      this.ajax_pars = {};
      //保留排序方式
      this.addPropertyNoAjax({ sort: temp });
      //搜索页面保留搜索关键词
      if (now_page_name == "search") {
        this.addPropertyNoAjax({ word: word });
      }
      //再次初始化
      this.initAjaxPars();
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
    },
    // 向ajax_pars中添加参数但是不进行ajax请求
    addPropertyNoAjax: function(obj) {
      for (var item in obj) {
        if (item != undefined && obj[item] != undefined) {
          this.ajax_pars[item] = obj[item];
        }
      }
    },
    // 从ajax_pars中删除属性但是不进行ajax请求
    deletePropertyNoAjax: function(items) {
      for (var item of items) {
        if (item != undefined && this.ajax_pars.hasOwnProperty(item)) {
          delete this.ajax_pars[item];
        }
      }
    },
    //判断当前是不是中小屏幕
    isMidSmallScreen: function() {
      var screen_width = document.body.clientWidth;
      if (screen_width >= 992) {
        return false;
      }
      return true;
    }
    //
  }
  //
};
</script>