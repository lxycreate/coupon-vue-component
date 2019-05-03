<template>
  <!-- 商品区域   START -->
  <div class="goods_area" v-bind:class="{toggle_goods_area:toggle_list}" v-cloak>
    <!-- 商品列表   START -->
    <ul class="goods_list" v-bind:class="{toggle_goods_list:toggle_list}">
      <li
        v-for="(item,index) in goods_list"
        v-bind:class="{toggle_li:toggle_list}"
        v-bind:key="index"
      >
        <span class="item" v-bind:class="{toggle_item:toggle_list}">
          <span class="container" v-bind:class="{toggle_container:toggle_list}">
            <!-- 商品图片 -->
            <span class="img_box">
              <img v-bind:src="item.goods_pic">
              <span class="link_box">
                <a v-if="item.is_tmall" v-bind:href="item.goods_url" target="_blank">
                  <i class="icon-font i-right"></i>去天猫
                </a>
                <a v-if="!item.is_tmall" v-bind:href="item.goods_url" target="_blank">
                  <i class="icon-font i-right"></i>去淘宝
                </a>
                <a v-bind:href="item.coupon_url" target="_blank">
                  <i class="icon-font i-installment"></i>去领券
                </a>
              </span>
              <span v-if="item.is_ju" class="ju">正在参加聚划算</span>
              <span v-if="item.is_qiang" class="qiang">正在参加淘抢购</span>
            </span>
            <!-- 商品图片 -->
          </span>
          <span class="container" v-bind:class="{toggle_container:toggle_list}">
            <span class="text_box" v-bind:class="{toggle_text_box:toggle_list}">
              <!-- 标题 -->
              <a class="title" target="_blank" @click="goToDetail(item.goods_id)">
                <img v-if="item.is_tmall" src="../images/tmall.png">
                <img v-if="!item.is_tmall" src="../images/taobao.png">
                {{item.goods_title}}
              </a>
              <!-- 价格 -->
              <span class="org_price">
                <span class="box">
                  <span class="price_title">原价</span>
                  <span class="icon">￥</span>
                  <span class="num">{{item.goods_price}}</span>
                </span>
                <span v-if="item.is_yun" class="tag_box">
                  <span
                    v-show="item.is_yun"
                    class="xian"
                    title="运费险"
                    @mouseover="showLayer(item)"
                    @mouseout="hideLayer(item)"
                  >险</span>
                  <transition name="layer">
                    <span v-show="item.is_show_yun" class="layer">
                      运费险
                      <i class="icon-font i-play"></i>
                    </span>
                  </transition>
                </span>
              </span>
              <!-- 券后价 -->
              <span class="price">
                <span class="price_title">券后</span>
                <span class="icon">￥</span>
                <span class="num">{{item.after_coupon}}</span>
              </span>
              <!-- 价格   end -->
              <!-- 销量 -->
              <span class="sale" v-bind:class="{toggle_sale:toggle_list}">
                <span class="sale_container" v-bind:class="{toggle_sale_container:toggle_list}">
                  <span class="sale_title" v-bind:class="{toggle_sale_child:toggle_list}">销量</span>
                  <span
                    class="num"
                    v-bind:class="{toggle_sale_child:toggle_list}"
                  >{{item.goods_sale}}</span>
                </span>
              </span>
              <!-- 销量   end -->
              <!-- 优惠券 -->
              <span class="quan_box" v-bind:class="{toggle_quan_box:toggle_list}">
                <a
                  v-bind:href="item.coupon_url"
                  class="quan"
                  target="_blank"
                  v-bind:class="{toggle_quan:toggle_list}"
                >
                  <span class="quan_container" v-bind:class="{toggle_quan_container:toggle_list}">
                    <span class="quan_title" v-bind:class="{toggle_quan_title:toggle_list}">领券</span>
                    <i v-bind:class="{toggle_quan_icon:toggle_list}">￥</i>
                    <span
                      class="num"
                      v-bind:class="{toggle_quan_num:toggle_list}"
                    >{{item.coupon_price}}</span>
                  </span>
                </a>
              </span>
              <!-- 优惠券   end -->
            </span>
            <!-- text_box -->
          </span>
          <!-- container -->
        </span>
        <!-- item -->
      </li>
    </ul>
    <!-- 商品列表   END -->
    <span v-show="is_loading_more" class="tip">正在加载...</span>
    <span v-show="!is_more_goods" class="tip">没有更多了...</span>
  </div>
  <!-- 商品区域   END -->
</template>

<script>
import Vue from "vue";
export default {
  name: "Goods",
  components: {},
  props: {
    //   商品数组
    goods_list: Array
  },
  data: function() {
    return {
      clear_list_flag: false, //清空数组标志
      toggle_list: false, //切换列表显示方式
      is_loading_more: false, //加载下一页提示
      is_more_goods: true //是否还有更多商品
    };
  },
  created: function() {},
  methods: {
    // 显示‘没有更多了...’提示
    showNomoreTip() {
      this.is_more_goods = false;
    },
    // 隐藏没有更多商品的提示
    hideNomoreTip() {
      this.is_more_goods = true;
    },
    // 显示正在加载更多提示
    showLoadingMore() {
      this.is_loading_more = true;
    },
    // 隐藏正在加载更多提示
    hideLoadingMore() {
      this.is_loading_more = false;
    },
    // 切换列表显示方式
    toggleList() {
      this.toggle_list = !this.toggle_list;
    },
    // 显示运费险弹层
    showLayer(item) {
      Vue.set(item, "is_show_yun", true);
    },
    // 隐藏弹层
    hideLayer: function(item) {
      Vue.set(item, "is_show_yun", false);
    },
    // 转到详情页
    goToDetail(goods_id) {
      window.location.href = "detail.html?goods_id=" + goods_id;
    }
    //
  }
};
</script>

<style>
/* -----------------------------------------------商品   开始----------------------------------- */

.goods_area {
  position: relative;
  max-width: 1200px;
  margin: auto;
}

.goods_area .goods_list {
  font-size: 0;
  text-align: left;
}

.goods_area .goods_list > li {
  display: inline-block;
  margin-top: 20px;
  width: 20%;
  vertical-align: top;
}

.goods_area .goods_list > li .item {
  position: relative;
  display: block;
  width: 95%;
  margin: auto;
  background-color: #ffffff;
}

.goods_area .goods_list .item .container {
  position: relative;
  display: block;
  padding: 6px;
  margin: auto;
}

.goods_area .goods_list .item .container .img_box {
  position: relative;
  display: block;
  overflow: hidden;
}

.goods_area .goods_list .item .container .img_box > img {
  width: 100%;
}

.goods_area .goods_list .item .container .img_box .link_box {
  position: relative;
  display: none;
  height: 30px;
  margin-top: -30px;
  font-size: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.goods_area .goods_list .item:hover {
  box-shadow: 0 0 8px #888888;
}

.goods_area .goods_list .item:hover .link_box {
  display: block !important;
}

.goods_area .goods_list .item .container .img_box .link_box > a {
  display: inline-block;
  width: 50%;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  color: #ffffff;
  text-decoration: none;
}

.goods_area .goods_list .item .container .img_box .link_box > a:hover {
  cursor: pointer;
  background-color: #fa5319;
}

.goods_area .goods_list .item .container .img_box .link_box > a i {
  margin-right: 3px;
}

.goods_area .goods_list .item .container .img_box .ju {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px;
  color: #ffffff;
  font-size: 14px;
  background-color: #7144d5;
  background: -webkit-linear-gradient(right, #63aff9, #8b16f5);
  background: -o-linear-gradient(right, #63aff9, #8b16f5);
  background: -moz-linear-gradient(right, #63aff9, #8b16f5);
  background: linear-gradient(right, #63aff9, #8b16f5);
}

.goods_area .goods_list .item .container .img_box .qiang {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px;
  color: #ffffff;
  font-size: 14px;
  background-color: #e63140;
  background: -webkit-linear-gradient(right, #f58b07, #f51616);
  background: -o-linear-gradient(right, #f58b07, #f51616);
  background: -moz-linear-gradient(right, #f58b07, #f51616);
  background: linear-gradient(right, #f58b07, #f51616);
}

.goods_area .goods_list .item .container:last-child {
  padding-top: 0;
}

.goods_area .goods_list .item .container .text_box {
  position: relative;
  display: block;
  font-size: 0;
}

.goods_area .goods_list .item .container .text_box > span {
  margin-top: 5px;
}

.goods_area .goods_list .item .text_box .title {
  position: relative;
  display: block;
  font-size: 15px;
  line-height: 25px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.goods_area .goods_list .item .text_box .title:hover {
  cursor: pointer;
  color: #ff4200;
}

.goods_area .goods_list .item .text_box .title > img {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin: -3px 2px 0 0;
  vertical-align: middle;
}

/* 原价   start */
.goods_area .goods_list .item .text_box .org_price {
  display: block;
  font-size: 0;
  margin-top: 3px;
  padding-right: 3px;
}

.goods_area .goods_list .item .text_box .org_price > span {
  display: inline-block;
}

.goods_area .goods_list .item .text_box .org_price .box > span {
  vertical-align: middle;
}

.goods_area .goods_list .item .text_box .org_price .box {
  width: 80%;
}

.goods_area .goods_list .item .text_box .org_price .tag_box {
  position: relative;
  width: 20%;
}

.goods_area .goods_list .item .text_box .org_price .price_title {
  font-size: 14px;
  color: #999999;
}

.goods_area .goods_list .item .text_box .org_price .icon {
  font-size: 14px;
  color: #999999;
  margin-left: 3px;
}

.goods_area .goods_list .item .text_box .org_price .num {
  margin-left: 2px;
  font-size: 15px;
  color: #999999;
}

.goods_area .goods_list .item .text_box .tag_box {
  text-align: right;
}

.goods_area .goods_list .item .text_box .tag_box > span {
  position: relative;
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 3px;
  font-size: 14px;
  color: #ffffff;
  text-align: center;
  line-height: 18px;
  vertical-align: middle;
  background-color: #ff0036;
}

.goods_area .goods_list .item .text_box .tag_box .layer {
  position: absolute;
  z-index: 99;
  top: 50%;
  left: 100%;
  display: block;
  width: 70px;
  height: 26px;
  margin: -12px 0 0 -100px;
  line-height: 25px;
  border-radius: 2px;
  font-size: 14px;
  box-shadow: 0 0 2px #999999;
  background-color: #ff0036;
}

.goods_area .goods_list .item .text_box .tag_box .layer > i {
  position: absolute;
  top: 0;
  left: 100%;
  width: 0;
  height: 0;
  margin-left: -8px;
  font-size: 0;
  border-bottom: 15px solid #ff0036;
  border-right: 15px solid transparent;
}

.layer-enter-active {
  /* animation-timing-function: linear; */
  animation: layer-in 0.2s;
}

.layer-leave-active {
  /* animation-timing-function: linear; */
  animation: layer-in 0.2s reverse;
}

@keyframes layer-in {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* 原价   end */
/* 券后   start */
.goods_area .goods_list .item .text_box .price {
  display: block;
  font-size: 0;
  margin-top: 3px;
}

.goods_area .goods_list .item .text_box .price > span {
  display: inline-block;
  vertical-align: middle;
  color: #ff0036;
  line-height: 20px;
}

.goods_area .goods_list .item .text_box .price .price_title {
  font-size: 14px;
}

.goods_area .goods_list .item .text_box .price .icon {
  font-size: 14px;
  margin-left: 3px;
}

.goods_area .goods_list .item .text_box .price .num {
  margin-left: 2px;
  font-size: 18px;
  font-weight: bold;
}

/* 券后   end */
/* 销量   start */
.goods_area .goods_list .item .text_box .sale {
  display: block;
  font-size: 0;
  margin-top: 3px;
}

.goods_area .goods_list .item .text_box .sale > span {
  display: inline-block;
  color: #666666;
}

.goods_area .goods_list .item .text_box .sale_container > span {
  vertical-align: middle;
}

.goods_area .goods_list .item .text_box .sale .sale_title {
  font-size: 14px;
}

.goods_area .goods_list .item .text_box .sale .num {
  margin-left: 3px;
  font-size: 18px;
}

/* 销量   end */
/* 领券   start */
.goods_area .goods_list .item .text_box .quan_box {
  display: block;
  margin-top: 3px;
  text-align: right;
}

.goods_area .goods_list .item .text_box .quan {
  display: inline-block;
  color: #ff4200;
  text-align: right;
}

.goods_area .goods_list .item .text_box .quan .quan_title {
  display: inline-block;
  font-size: 14px;
  vertical-align: middle;
}

.goods_area .goods_list .item .text_box .quan i {
  display: inline-block;
  font-style: normal;
  font-size: 15px;
  margin-left: 3px;
  margin-top: 2px;
  line-height: 1;
  vertical-align: middle;
}

.goods_area .goods_list .item .text_box .quan .num {
  display: inline-block;
  font-size: 18px;
  font-weight: bold;
  line-height: 20px;
  vertical-align: middle;
}

.goods_area .goods_list .item .text_box .sale_container {
  display: block;
}

.goods_area .goods_list .item .text_box .quan_container {
  display: inline-block;
}

/* 领券   end */
/* 切换列表显示方式   start */
.toggle_goods_area {
  padding: 0 !important;
}

.toggle_goods_list {
  margin-top: 20px;
}

.toggle_li {
  width: 100% !important;
  margin-top: 1px !important;
}

.toggle_item {
  width: auto !important;
  padding: 6px !important;
  font-size: 0 !important;
  box-shadow: none !important;
}

.toggle_container {
  display: inline-block !important;
  width: calc(100% - 146px);
  min-height: 140px;
  padding: 0 !important;
  vertical-align: top !important;
}

.toggle_container:first-child {
  width: 140px !important;
  height: 140px !important;
  margin-right: 6px !important;
}

.toggle_text_box {
  width: 100%;
  height: 100%;
}

.toggle_sale {
  position: relative;
  display: inline-block !important;
  width: 50%;
  margin-left: 3px;
  margin-top: 10px !important;
  vertical-align: middle;
  text-align: left;
}

.toggle_sale_container {
  display: inline-block;
  max-width: 100px;
}

.toggle_sale_child {
  display: block !important;
  text-align: center;
  margin: 2px 0 0 0 !important;
}

.toggle_quan_box {
  position: relative !important;
  display: inline-block !important;
  width: calc(49% - 3px);
  margin-top: 10px !important;
  vertical-align: middle;
  text-align: right !important;
}

.toggle_quan {
  width: 100%;
  max-width: 80px;
}

.toggle_quan_container {
  display: inline-block;
  width: 100%;
  min-height: 40px;
  border-radius: 5px;
  text-align: center;
  border: 1px solid #fa5319;
}

.toggle_quan_title {
  display: block !important;
  height: 20px;
  text-align: center;
  color: #ffffff;
  line-height: 20px;
  padding: 3px 0;
  border-radius: 2px 2px 0 0;
  background-color: #fa5319;
}

.toggle_quan_icon {
  margin: 0 !important;
}

.toggle_quan_num {
  padding: 3px 0;
}

/* 切换列表显示方式   end */
.goods_area .tip {
  display: block;
  margin: 15px auto 0 auto;
  text-align: center;
  color: #666666;
  line-height: 1;
}

@media (max-width: 1199px) {
  .goods_area .goods_list > li {
    width: 25%;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .goods_area {
    padding: 0 20px;
  }
}

@media (max-width: 992px) {
  .goods_area .goods_list .item:hover .link_box {
    display: none !important;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .goods_area {
    padding: 0 20px;
  }
}

@media (max-width: 767px) {
  .goods_area {
    padding: 0 5px;
  }

  .goods_area .goods_list > li {
    width: 50%;
    margin-top: 10px;
  }
}

/* -----------------------------------------------商品   结束----------------------------------- */
</style>
