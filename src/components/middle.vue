<template>
  <div class="middle">
    <FilterComponent ref="FilterComponent"/>
    <Goods ref="Goods" :goods_list="goods_list"></Goods>
  </div>
</template>

<script>
import FilterComponent from "./filter.vue";
import Goods from "./goods.vue";
import Axios from "axios";

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
      clear_list_flag: false,
      // 请求地址
      base_url: "http://localhost:8088",
      // 是否还有更多商品
      is_more_goods: true
    };
  },
  created: function() {},
  mounted: function() {
    this.initAjaxPars();
    this.loadGoods("");
  },
  methods: {
    // 重置当前页码
    resetPageNum() {
      this.page_num = 1;
      this.addPropertyNoAjax({ page_num: this.page_num });
    },
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
        this.ajax_pars[pro_name] = pro_value;
        this.loadGoods(pro_name);
      }
    },
    // 从ajax_pars中删除属性
    deleteProperty: function(pro_name) {
      if (this.ajax_pars.hasOwnProperty(pro_name) && this.can_ajax) {
        delete this.ajax_pars[pro_name];
        this.loadGoods(pro_name);
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
        this.$refs.FilterComponent.showLoading();
        setTimeout(() => {
          this.getGoods(this.taskData);
        }, 300);
      }
    },
    // 获取商品数据
    getGoods: function(callback) {
      console.log(this.ajax_pars);
      Axios({
        url: this.base_url + "/getGoods",
        method: "get",
        params: this.ajax_pars
      })
        .then(response => {
          //处理返回的数据
          callback(response);
          console.log(response.data.goods);
          //可以加载下一页
          this.can_ajax = true;
        })
        .catch(error => {
          this.error_count++;
          if (this.error_count >= 3) {
            this.can_ajax = false;
          }
          this.closeLoading();
          console.log("请求商品数据出错: " + error);
        });
    },
    // 处理返回的数据
    taskData(response) {
      // 清空数组
      if (this.clear_list_flag) {
        this.clearListItems();
      }
      //关闭动画
      this.closeLoading();
      // 判断返回的数据是否等于每页数据量(如果是，说明还有下一页,否则没有)
      if (response.data.goods.length == this.page_size) {
        this.is_more_goods = true;
        this.$refs.Goods.hideNomoreTip();
      } else {
        // 保证加载动画结束后才出现"没有更多了..."提示
        setTimeout(() => {
          this.is_more_goods = false;
          this.$refs.Goods.showNomoreTip();
        }, 300);
      }
      // 将返回的商品数据装入Vue对象中的数组中,显示到界面中
      if (response.data.goods != null && response.data.goods.length != 0) {
        for (var i = 0; i < response.data.goods.length; ++i) {
          var e = response.data.goods[i];
          if (e.is_ju == "-1") {
            e.is_ju = false;
          }
          if (e.is_qiang == "-1") {
            e.is_qiang = false;
          }
          if (e.is_yun == "-1") {
            e.is_yun = false;
          }
          if (e.is_gold == "-1") {
            e.is_gold = false;
          }
          if (e.is_ji == "-1") {
            e.is_ji = false;
          }
          if (e.is_hai == "-1") {
            e.is_hai = false;
          }
          this.goods_list.push(e);
        }
      }
    },
    // 关闭动画
    closeLoading() {
      this.$refs.FilterComponent.closeLoading();
      this.$refs.Goods.hideLoadingMore();
      // this.
    },
    // 清空当前商品列表
    clearListItems() {
      this.goods_list = [];
      this.resetPageNum();
    },
    // 加载下一页
    loadNextPage() {
      if (this.can_ajax&&this.is_more_goods) {
        this.can_ajax = false;
        //清空数组标志
        this.clear_list_flag = false;
        // 显示加载动画
        this.$refs.Goods.showLoadingMore();
        // 添加属性
        this.addPropertyNoAjax({ page_num: this.page_num + 1 });
        setTimeout(() => {
          this.getGoods(this.taskData);
          this.page_num = this.page_num + 1;
        }, 600);
      }
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
