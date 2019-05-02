
<template>
  <!-- 筛选 START-->
  <div class="filter_box">
    <div class="filter_container" ref="js_filter_container">
      <div class="btn_top_container">
        <!-- 分类选择  START -->
        <div class="select_box js_catalog_box">
          <span class="name">分类</span>
          <ul>
            <!--  -->
            <li
              v-for="item in catalog_items"
              v-bind:class="{catalog_btn_bg: item.is_select}"
              v-on:click="selectCatalogItem(item.value)"
              v-bind:key="item.value"
            >
              <a>{{item.name}}</a>
            </li>
            <!--  -->
          </ul>
        </div>
        <!-- 分类选择  END -->
        <!-- 多条件筛选   START -->
        <div class="multi_select_box">
          <span class="name">筛选</span>
          <ul>
            <!-- 分割线 -->
            <li
              v-for="item in filter_items"
              v-on:click="multiSelect(item.index)"
              v-bind:class="{is_multi_selected: item.is_select}"
              v-bind:key="item.index"
            >
              <a type="radio">
                <span v-bind:class="{multi_selected: item.is_select}">
                  <i class="icon-font i-tick"></i>
                </span>
                {{item.name}}
              </a>
            </li>
            <!-- 分割线 -->
          </ul>
        </div>
        <!-- 多条件筛选   END -->
        <!-- 更多筛选条件   START -->
        <div class="more_filter">
          <span class="name">更多</span>
          <ul>
            <li class="sale">
              <span>{{sale_item.name}}</span>
              <input
                maxlength="8"
                v-model="sale_item.value"
                v-on:keyup="onlyPositiveInt"
                v-on:blur="fixValueRemains(sale_item)"
              >
            </li>
            <li class="score">
              <span>{{score_item.name}}</span>
              <input
                maxlength="3"
                v-model="score_item.value"
                v-on:keyup="zeroToFive"
                v-on:blur="fixValueRemains(score_item)"
              >
              <span class="tip">{{score_item.tip}}</span>
            </li>
            <li class="quan">
              <span>{{quan_item.name}}</span>
              <input
                maxlength="8"
                class="one"
                v-model="quan_item.start_price"
                placeholder="最低价"
                v-on:keyup="onlyPositiveInt"
                v-on:blur="fixValueRemains(quan_item)"
              >
              <span class="split">—</span>
              <input
                maxlength="8"
                class="two"
                v-model="quan_item.end_price"
                placeholder="最高价"
                v-on:keyup="onlyPositiveInt"
                v-on:blur="fixValueRemains(quan_item)"
              >
            </li>

            <li class="btn">
              <span @click="clear" class="confirm">重置</span>
              <span @click="confirm" class="confirm">确认</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 重置、确认按钮 -->
      <div class="btn_bottom_container">
        <span class="confirm" @click="clear">重置</span>
        <span class="confirm" @click="confirm">确认</span>
      </div>
      <!-- 更多筛选条件   END -->
      <!-- 加载动画  START -->
      <div v-if="is_loading" class="loading">
        <img src="../images/loading.gif">
      </div>
      <!-- 加载动画  END -->
    </div>

    <!-- 排序方式   START -->
    <div class="sort_way">
      <!--  -->
      <ul class="btn_box">
        <!-- "综合" -->
        <li
          class="btn"
          v-for="(item,index) in sort_item"
          v-bind:class="{price:index==2,is_sort_selected:item.is_select}"
          v-bind:key="index"
        >
          <a v-if="index!=2" @click="changeSortWay(index,item.way)">{{item.name}}</a>
          <a v-else @click="sortByPrice">
            {{item.name}}
            <span v-show="item.is_select">
              <i
                ref="js_transform"
                class="icon-font i-dropdown"
                v-bind:class="{is_sort_selected:item.is_select}"
              ></i>
            </span>
          </a>
        </li>
        <!-- "列表显示切换,992及以上不显示" -->
        <li class="btn list_toggle">
          <a @click="toggleList">
            <i v-show="toggle_list.is_first_icon" class="icon-font i-list-index"></i>
            <i v-show="!toggle_list.is_first_icon" class="icon-font i-calendar-2"></i>
          </a>
        </li>
        <!-- "筛选,992及以上不显示" -->
        <li class="btn filter_btn">
          <a ref="js_show_side" @click="toggleSide">筛选</a>
        </li>
      </ul>
      <!--  -->
      <!-- 遮罩,弹出擦边栏时防止误触 -->
      <div v-show="is_show_side" ref="js_shade" class="shade"></div>
    </div>
    <!-- 排序方式   end -->
    <!-- 加载动画 -->
    <span v-show="is_loading" class="loading_text">加载中...</span>
  </div>
  <!-- 筛选   END -->
</template>

<script>
export default {
  name: "FilterComponent",
  props: {},
  data: function() {
    return {
      // 目录选择
      catalog_value: "0",
      catalog_items: [
        {
          name: "全部", // 目录名
          value: 0, //目录对应值
          is_select: true //是否被选中
        },
        {
          name: "女装",
          value: 1,
          is_select: false
        },
        {
          name: "男装",
          value: 2,
          is_select: false
        },
        {
          name: "内衣",
          value: 3,
          is_select: false
        },
        {
          name: "数码家电",
          value: 4,
          is_select: false
        },
        {
          name: "美食",
          value: 5,
          is_select: false
        },
        {
          name: "美妆个护",
          value: 6,
          is_select: false
        },
        {
          name: "母婴",
          value: 7,
          is_select: false
        },
        {
          name: "鞋包配饰",
          value: 8,
          is_select: false
        },
        {
          name: "家居家装",
          value: 9,
          is_select: false
        },
        {
          name: "文体车品",
          value: 10,
          is_select: false
        },
        {
          name: "其他",
          value: 11,
          is_select: false
        }
      ],
      // 多选筛选条件
      filter_value: "", //当前(选中/取消)的是哪个,相应的从参数添加/删除
      filter_items: [
        {
          name: "淘抢购", //名称
          index: 1, //必须使用自定义的index，否则监听filter_value的函数中出现异常出现-0
          an_name: "is_qiang", //搜索时的对应的参数名
          is_select: false //是否被选中
        },
        {
          name: "聚划算",
          index: 2,
          an_name: "is_ju",
          is_select: false
        },
        {
          name: "天猫",
          index: 3,
          an_name: "is_tmall",
          is_select: false
        },
        {
          name: "金牌卖家",
          index: 4,
          an_name: "is_gold",
          is_select: false
        },
        {
          name: "极有家",
          index: 5,
          an_name: "is_ji",
          is_select: false
        },
        {
          name: "海淘",
          index: 6,
          an_name: "is_hai",
          is_select: false
        },
        {
          name: "运费险",
          index: 7,
          an_name: "is_yun",
          is_select: false
        }
      ],
      //券后价格区间筛选
      quan_item: {
        name: "券后价格区间",
        start_price: "", //最低价
        end_price: "" //最高价
      },
      //评分筛选
      score_item: {
        name: "动态评分≥",
        value: "",
        tip: " (0分-5分)"
      },
      //销量筛选
      sale_item: {
        name: "总销量≥",
        value: ""
      },
      // 是否显示loading动画
      is_loading: false,
      is_show_side: false, //侧边栏当前是否显示
      sort_item: [
        {
          name: "综合", //名称
          way: "all", //排序类型
          is_select: true //是否选中
        },
        {
          name: "销量",
          way: "goods_sale desc",
          is_select: false
          // 销量只有降序排序
        },
        {
          name: "价格",
          way: "goods_price",
          is_select: false,
          is_up: false //升序排序
        }
      ],
      //  列表显示方式
      toggle_list: {
        is_first_icon: true
      }
    };
  },
  created: function() {
    this.mouseDown();
  },
  methods: {
    // 单选目录事件
    selectCatalogItem: function(value) {
      this.catalog_value = value;
      for (var i = 0; i < this.catalog_items.length; ++i) {
        this.catalog_items[i].is_select = false;
      }
      this.catalog_items[value].is_select = true;

      // 参数中添加目录信息
      if (this.catalog_value != 0) {
        this.$parent.addProperty("goods_cid", this.catalog_value);
      } else {
        this.$parent.deleteProperty("goods_cid");
      }
    },
    // 多选筛选条件事件
    multiSelect: function(index) {
      // 多选取消选中
      if (this.filter_items[index - 1].is_select) {
        this.filter_items[index - 1].is_select = false;
        this.filter_value = "-" + index;
      }
      // 多选选中
      else {
        this.filter_items[index - 1].is_select = true;
        this.filter_value = index;
        //"淘抢购"和"聚划算"是互斥的
        //当两个同时被选中时,取消之前被选中的那个
        if (index == 1 && this.filter_items[1].is_select) {
          //取消选中"聚划算"
          this.filter_items[1].is_select = false;
          this.$parent.deletePropertyNoAjax(["is_ju"]);
        }
        if (index == 2 && this.filter_items[0].is_select) {
          //取消选中"淘抢购"
          this.filter_items[0].is_select = false;
          this.$parent.deletePropertyNoAjax(["is_qiang"]);
        }
      }
      //向ajax_pars中删除或添加参数
      var index_temp = parseInt(this.filter_value);
      if (index_temp < 0) {
        index_temp = -index_temp;
        this.$parent.deleteProperty(this.filter_items[index_temp - 1].an_name);
      } else {
        this.$parent.addProperty(this.filter_items[index_temp - 1].an_name, "1");
      }
    },
    // 重置
    clear: function() {
      this.resetCatalogItem();
      this.resetMultiSelect();
      this.resetInput();
      this.$parent.resetAjaxPars();
      // 未完成  start
      window.scrollTo(0, 0);
      if (js_goods_area.can_ajax) {
        //清空加载
        loadGoods("");
      }
      console.log("Clear");
      // 未完成  end
    },
    //重置目录
    resetCatalogItem: function() {
      this.catalog_value = "0";
      for (var i = 1; i < this.catalog_items.length; ++i) {
        this.catalog_items[i].is_select = false;
      }
      this.catalog_items[0].is_select = true;
    },
    //重置多选
    resetMultiSelect: function() {
      this.filter_value = "";
      for (var i = 0; i < this.filter_items.length; ++i) {
        this.filter_items[i].is_select = false;
      }
    },
    //重置输入框
    resetInput: function() {
      this.sale_item.value = "";
      this.score_item.value = "";
      this.quan_item.start_price = "";
      this.quan_item.end_price = "";
    },
    // 确认
    confirm: function() {
      this.checkAfterCoupon();
      // 不明白为什么有这句
      // this.deleteInputValue();
      this.addInputValue();
      if (js_goods_area.can_ajax && this.checkInputIsNotEmpty()) {
        //确认 加载
        loadGoods("input");
      }
      console.log("Confirm");
    },
    // 检查输入框是否不为空
    checkInputIsNotEmpty: function() {
      if (
        this.sale_item.value != "" ||
        this.score_item.value != "" ||
        this.quan_item.start_price != "" ||
        this.quan_item.end_price != ""
      ) {
        return true;
      }
      return false;
    },
    //检查券后价是否是输入的最低价大于最高价
    checkAfterCoupon: function() {
      if (
        this.isNumber(this.quan_item.start_price) &&
        this.isNumber(this.quan_item.end_price)
      ) {
        var start = parseInt(this.quan_item.start_price);
        var end = parseInt(this.quan_item.end_price);
        if (start > end) {
          var temp = this.quan_item.start_price;
          this.quan_item.start_price = this.quan_item.end_price;
          this.quan_item.end_price = temp;
        }
      }
    },
    // 判断是否是数字
    isNumber: function(val) {
      var regPos = /^\d+(\.\d+)?$/; //非负浮点数
      if (regPos.test(val)) {
        return true;
      } else {
        return false;
      }
    },
    // 修复输入后在相应的value中残留的事件
    fixValueRemains: function(obj) {
      if (obj == this.sale_item) {
        this.sale_item.value = obj.value.replace(/\D/g, "");
      }
      if (obj == this.score_item) {
        this.score_item.value = obj.value.replace(/[^\d.]/g, "");
      }
      if (obj == this.quan_item) {
        this.quan_item.start_price = obj.start_price.replace(/\D/g, "");
        this.quan_item.end_price = obj.end_price.replace(/\D/g, "");
      }
    },
    //只输入正整数
    onlyPositiveInt: function(event) {
      event.target.value = event.target.value.replace(/\D/g, "");
    },
    //0-5
    zeroToFive: function(event) {
      if (event.target.value[0] == ".") {
        event.target.value = event.target.value.substr(1);
      }
      event.target.value = event.target.value.replace(/[^\d.]/g, ""); //清除“数字”和“.”以外的字符
      event.target.value = event.target.value.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的

      if (this.isNumber(event.target.value)) {
        var temp = parseFloat(event.target.value);
        if (temp > 5) {
          event.target.value = "";
        }
      }
    },
    //从ajax_pars中删除input
    deleteInputValue: function() {
      this.$parent.deletePropertyNoAjax(["sale_num", "dsr", "start_price", "end_price"]);
    },
    //向ajax_pars中添加input值
    addInputValue: function() {
      var obj = {};
      if (this.sale_item.value != "") {
        obj.sale_num = this.sale_item.value;
      }
      if (this.score_item.value != "") {
        obj.dsr = this.score_item.value;
      }
      if (this.quan_item.start_price != "") {
        obj.start_price = this.quan_item.start_price;
      }
      if (this.quan_item.end_price != "") {
        obj.end_price = this.quan_item.end_price;
      }
      if (this.checkInputIsNotEmpty()) {
        this.$parent.addPropertyNoAjax(obj);
      }
    },
    // 价格排序
    sortByPrice: function() {
      this.changeSelectedColor(2);
      this.transformIcon();
      this.sort_item[2].is_up = !this.sort_item[2].is_up;
    },
    //  切换价格排序的icon
    transformIcon: function() {
      Velocity(this.$refs.js_transform, "stop");
      if (!this.sort_item[2].is_up) {
        Velocity(this.$refs.js_transform, {
          "margin-top": "8px",
          rotateZ: "-180deg"
        });
        // 价格升序排序
        this.$parent.addProperty("sort", "goods_price asc");
      } else {
        Velocity(this.$refs.js_transform, {
          "margin-top": "13px",
          rotateZ: "0deg"
        });
        // 价格降序排序
        this.$parent.addProperty("sort", "goods_price desc");
      }
    },
    // 重置价格排序的icon
    resetPriceIcon: function() {
      Velocity(this.$refs.js_transform, "stop");
      Velocity(this.$refs.js_transform, {
        "margin-top": "13px",
        rotateZ: "0deg"
      });
      this.sort_item[2].is_up = false;
    },
    // 鼠标按下事件
    mouseDown: function() {
      var _self = this;
      document.body.addEventListener("click", function(event) {
        var point = event || window.event;
        var screen_width = document.body.clientWidth;
        if (
          screen_width < 992 &&
          screen_width - point.clientX > 300 &&
          event.target != _self.$refs.js_show_side
        ) {
          console.log("在侧栏外");
          _self.hideSide();
        }
        if (event.target == _self.$refs.js_show_side) {
          console.log("单击筛选");
        }
      });
    },
    // 切换列表显示方式
    toggleList: function() {
      this.toggle_list.is_first_icon = !this.toggle_list.is_first_icon;
      js_goods_area.toggle_list = !js_goods_area.toggle_list;
    },
    // 显示筛选侧边
    showSide: function() {
      if (this.$parent.isMidSmallScreen() && !this.is_show_side) {
        this.stopSideAnimate();
        this.is_show_side = true;
        Velocity(this.$refs.js_filter_container, {
          "margin-left": "-300px"
        });
        console.log("显示侧边栏");
      }
    },
    // 隐藏筛选侧边
    hideSide: function() {
      if (this.$parent.isMidSmallScreen() && this.is_show_side) {
        this.stopSideAnimate();
        this.is_show_side = false;
        Velocity(this.$refs.js_filter_container, {
          "margin-left": "0px"
          // 同上
        });
        console.log("隐藏侧边栏");
      }
    },
    // 切换侧边显示状态
    toggleSide: function() {
      if (this.is_show_side) {
        this.hideSide();
      } else {
        this.showSide();
      }
    },
    // 停止侧边动画(防止操作频率过快导致异常)
    stopSideAnimate: function() {
      Velocity(this.$refs.js_filter_container, "stop");
    },
    // 切换排序方式
    changeSortWay: function(index, way) {
      this.changeSelectedColor(index);
      this.$parent.addProperty("sort", way);
    },
    // 改变被选中的排序按钮的颜色
    changeSelectedColor: function(index) {
      // 价格图标按钮重置
      if (index != 2) {
        this.resetPriceIcon();
      }
      for (var i = 0; i < this.sort_item.length; ++i) {
        this.sort_item[i].is_select = false;
      }
      this.sort_item[index].is_select = true;
    },
    // 显示加载动画
    showLoading() {
      this.is_loading = true;
    },
    closeLoading(){
      this.is_loading = false;
    },
    test: function() {
      console.log("filter");
    }
    // 事件 end
  }
  //
};
</script>

<style>
/* -----------------------------------------------筛选   开始----------------------------------- */
.filter_box {
  max-width: 1190px;
  margin: auto;
  font-size: 0;
}

.filter_box .filter_container {
  position: relative;
  padding-bottom: 10px;
  background-color: #ffffff;
}

.filter_box > div ul {
  display: inline-block;
  font-size: 0;
}

.filter_box .select_box ul li {
  display: inline-block;
  height: 30px;
  margin: 10px 0 0 10px;
  padding: 0 10px;
  font-size: 15px;
  line-height: 30px;
  text-align: center;
  border-radius: 5px;
}

.filter_box .select_box ul li:hover {
  cursor: pointer;
  color: #ffffff;
  background-color: #fa5319;
}

.catalog_btn_bg {
  color: #ffffff;
  background-color: #fa5319 !important;
}

.filter_box .multi_select_box {
  font-size: 0;
}

.filter_box .multi_select_box ul li {
  display: inline-block;
  height: 30px;
  font-size: 15px;
  line-height: 30px;
  text-align: center;
  margin: 10px 0 0 15px;
}

.filter_box .multi_select_box ul li a {
  display: block;
  height: 30px;
}

.filter_box .multi_select_box ul li a:hover {
  cursor: pointer;
}

.filter_box .multi_select_box ul li a > span {
  display: inline-block;
  width: 15px;
  height: 15px;
  vertical-align: middle;
  border-radius: 5px;
  background-color: #e5e5e5;
}

.filter_box .multi_select_box ul li a > span i {
  display: block;
  width: 15px;
  height: 15px;
  font-size: 8px;
  text-align: center;
  line-height: 15px;
  color: #ffffff;
  border-radius: 5px;
}

.multi_selected {
  background-color: #fa5319 !important;
}

.filter_box > div .name {
  display: inline-block;
  margin: 10px 0 0 12px;
  line-height: 30px;
  font-size: 15px;
  vertical-align: top;
  color: #666666;
}

.filter_box > div .name:after {
  content: ":";
}

.filter_box > div .name:hover {
  cursor: default;
}

.filter_box .more_filter ul li {
  display: inline-block;
  font-size: 0;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 10px 0 0 40px;
  vertical-align: top;
}

.filter_box .more_filter ul li:first-child {
  margin-left: 15px;
}

.filter_box .more_filter ul li > span {
  display: inline-block;
  height: 30px;
  font-size: 15px;
  vertical-align: top;
}

.filter_box .more_filter ul li > input {
  display: inline-block;
  width: 45px;
  height: 20px;
  margin: 5px 5px 0 10px;
  outline: none;
  font-size: 13px;
  vertical-align: top;
  border-radius: 5px;
  padding-bottom: 1px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #dddddd;
}

.filter_box .more_filter ul li > input:focus {
  border-color: #fa5319;
  box-shadow: 0 0 5px #fa5319;
}

.filter_box .more_filter ul li .tip {
  margin-left: 1px;
  color: #666666;
}

.filter_box .more_filter ul li .split {
  color: #999999;
}

.filter_box .more_filter ul .btn {
  margin-left: 90px;
}

.filter_box .more_filter ul li .confirm {
  width: 50px;
  height: 25px;
  line-height: 25px;
  margin-left: 15px;
  margin-top: 3px;
  color: #ffffff;
  border-radius: 5px;
  font-size: 14px;
  vertical-align: middle;
  background-color: #fa5319;
}

.filter_box .more_filter ul li .confirm:first-child {
  background-color: #666666;
}

.filter_box .more_filter ul li .confirm:hover {
  cursor: pointer;
}

.filter_box .loading {
  position: absolute;
  z-index: 50;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 30px;
  margin: -15px 0 0 -25px;
  text-align: center;
  line-height: 50px;
}

.filter_box .loading > img {
  width: 50px;
}

/* 排序 START */
.filter_box .sort_way {
  min-height: 30px;
}

.filter_box .sort_way .btn_box {
  display: block;
  background-color: #eeeeee;
}

.filter_box .sort_way .btn_box .btn {
  display: inline-block;
  width: 140px;
  height: 30px;
  font-size: 0;
  vertical-align: top;
  text-align: center;
}

.filter_box .sort_way .btn_box .btn:hover {
  cursor: pointer;
  color: #fa5319;
}

.filter_box .sort_way .btn_box .btn > a {
  display: block;
  height: 30px;
  line-height: 29px;
  font-size: 15px;
  text-align: center;
}

/* "列表切换"按钮  992及以上不显示 */
.filter_box .sort_way .btn_box .list_toggle {
  display: none;
}

/* "筛选"按钮  992及以上不显示 */
.filter_box .sort_way .btn_box .filter_btn {
  display: none;
}

.filter_box .sort_way .btn_box .price span {
  display: inline-block;
  width: 12px;
  height: 100%;
  vertical-align: top;
}

.filter_box .sort_way .btn_box .price i {
  display: block;
  margin-top: 13px;
  font-size: 6px;
  line-height: 1;
  color: #999999;
}

.is_sort_selected {
  color: #fa5319 !important;
}

.input_error {
  border-color: red !important;
  box-shadow: 0 0 5px red;
}

@media (min-width: 992px) {
  /* 遮罩 */
  .filter_box .shade {
    z-index: -1;
    display: none !important;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .filter_box {
    padding: 0 25px;
    background-color: transparent;
  }

  .filter_box .filter_container {
    padding-bottom: 10px;
    background-color: #ffffff;
  }

  .filter_box .filter_container > div .name {
    margin-left: 10px;
  }

  .filter_box .select_box > span {
    margin-left: 32px;
  }

  .filter_box .multi_select_box > span {
    margin-left: 32px;
  }

  .filter_box .more_filter > span {
    margin-left: 32px;
  }

  .filter_box .sort_way {
    margin-top: 0;
  }
}

@media (max-width: 991px) {
  .filter_box .filter_container {
    position: fixed;
    top: 0;
    left: 100%;
    z-index: 999;
    width: 300px;
    height: 100%;
    padding-bottom: 0;
    background-color: #ffffff;
  }

  .filter_box .filter_container .btn_top_container {
    position: relative;
    width: 100%;
    height: calc(100% - 50px);
    overflow: auto;
  }

  .filter_box .filter_container .name {
    display: block;
    width: 100%;
    margin-left: 0;
    text-indent: 1em;
    font-weight: bold;
  }
  .filter_box > div .name::after {
    display: none;
  }
  .filter_box .select_box > ul {
    padding: 0 0 0 15px;
    text-align: left;
  }

  .filter_box .select_box > ul > li {
    margin-left: 0;
    padding: 0;
    width: 80px;
    margin-right: 15px;
    background-color: #eeeeee;
  }

  .filter_box .multi_select_box .name {
    margin-top: 20px;
  }

  .filter_box .multi_select_box ul li a > span:first-child {
    display: none;
  }

  .filter_box .multi_select_box ul {
    padding: 0 0 0 15px;
    text-align: left;
  }

  .filter_box .multi_select_box > ul > li {
    margin-left: 0;
    padding: 0;
    width: 80px;
    margin-right: 15px;
    border-radius: 5px;
    background-color: #eeeeee;
  }

  .is_multi_selected {
    color: #ffffff;
    background-color: #fa5319 !important;
  }

  .filter_box .more_filter .name {
    display: none;
  }

  .filter_box .more_filter ul {
    display: block;
    padding: 0 0 15px 15px;
  }

  .filter_box .more_filter ul li {
    display: block;
    height: auto;
    margin: 12px 0 0 0;
    text-align: left;
  }

  .filter_box .more_filter ul li:first-child {
    margin: 15px 0 0 0;
  }

  .filter_box .more_filter ul li > span:first-child {
    font-weight: bold;
    color: #666666;
    text-align: left;
  }

  .filter_box .more_filter ul li input {
    width: 50px;
    height: 25px;
    margin-top: 3px;
    margin-left: 15px;
  }

  .filter_box .more_filter .sale input {
    margin-left: 30px;
  }

  .filter_box .more_filter .score .tip {
    margin-left: 5px;
  }

  .filter_box .more_filter .quan > span:first-child {
    display: block;
  }

  .filter_box .more_filter .quan .one {
    margin-left: 0;
  }

  .filter_box .more_filter .quan input {
    width: 60px;
    height: 30px;
    margin: 10px 0 0 0;
    text-align: center;
    border-radius: 5px;
    font-size: 15px;
  }

  .filter_box .more_filter .quan .split {
    margin: 10px 15px 0 15px;
  }

  .filter_box .more_filter .btn {
    display: none !important;
  }

  .filter_box .more_filter ul .btn .confirm {
    display: inline-block !important;
    width: 80px;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    margin: 10px 15px 0 0;
    font-weight: normal;
    color: #ffffff;
    text-align: center;
  }

  .filter_box .more_filter ul li .confirm:first-child {
    margin-left: 0;
  }

  .filter_box .filter_container .btn_bottom_container {
    position: absolute;
    top: 100%;
    margin-top: -50px;
    width: 100%;
    height: 50px;
    text-align: right;
  }

  .filter_box .btn_bottom_container .confirm {
    display: inline-block !important;
    width: 80px;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    margin: 10px 15px 0 0;
    font-weight: normal;
    color: #ffffff;
    text-align: center;
    border-radius: 5px;
    background-color: #fa5319;
  }

  .filter_box .btn_bottom_container .confirm:first-child {
    margin-left: 0;
    background-color: #666666;
  }

  .filter_box .sort_way .btn_box .filter_btn {
    display: inline-block;
  }

  /* 遮罩  开始 */
  .filter_box .sort_way .shade {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    width: 100%;
    height: 100%;
    opacity: 0.4;
    filter: alpha(40);
    background-color: #666666;
  }

  /* 遮罩  结束 */
}

@media (max-width: 767px) {
  .filter_box .sort_way .btn_box .btn {
    width: 20%;
  }
}

/* 屏幕宽度大于450不显示列表切换按钮 */
@media (max-width: 450px) {
  .filter_box .sort_way .btn_box .list_toggle {
    display: inline-block;
  }
}
.filter_box .loading_text {
  position: relative;
  display: block;
  width: 100%;
  margin-top: 10px;
  color: #666666;
  text-align: center;
}
/* -----------------------------------------------筛选   结束----------------------------------- */
</style>
