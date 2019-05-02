<template>
  <div class="middle">
    <FilterComponent ref="FilterComponent"/>
    <Goods ref="Goods"></Goods>
  </div>
</template>

<script>
import FilterComponent from "./filter.vue";
import Goods from "./goods.vue";
export default {
  name: "MiddleComponent",
  components: {
    FilterComponent,
    Goods
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
      goods_list: [],
      // 清理goods_list的标志
      clear_list_flag: false
    };
  },
  created: function() {},
  mounted: function() {
    this.initAjaxPars();
    this.loadGoods("");
  },
  methods: {
    // 初始化ajax_pars
    initAjaxPars: function() {
      this.ajax_pars = {};
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
      //再次初始化
      this.initAjaxPars();
      //保留排序方式
      this.addPropertyNoAjax({ sort: temp });
      //搜索页面保留搜索关键词
      if (now_page_name == "search") {
        this.addPropertyNoAjax({ word: word });
      }
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
    },
    // 加载商品
    loadGoods: function(pro_name) {
      //重置页码
      if (this.can_ajax) {
        this.can_ajax = false;
        //清空数组标志
        this.clear_list_flag = true;
        // 隐藏商品组件中的"没有更多了..."提示
        this.$refs.Goods.hideNomoreTip();
        // 筛选时显示"加载中..."
        // js_goods_area.is_loading = true;
        this.$refs.FilterComponent.showLoading();
        // if (pro_name != "sort") {
        //   js_filter_container.is_loading = true;
        // }
        var _self = this;
        setTimeout(function() {
          _self.getGoods();
        }, 300);
      }
    },
    // 获取商品数据
    getGOods() {
      console.log("111");
    }
    //
  }
};
</script>

<style>
.middle {
  min-height: 500px;
  margin: auto;
  padding: 20px 0 20px 0;
  background-color: #f5f5f5;
}
</style>
