<template>
  <div class="mid">
    <div class="limit">
      <!-- 商品详情 -->
      <div class="detail_box">
        <p class="container">
          <span class="img_box">
            <span v-if="goods_detail.is_ju" class="ju">正在参加聚划算</span>
            <span v-if="goods_detail.is_qiang" class="qiang">正在参加淘抢购</span>
            <img v-bind:src="goods_pic">
          </span>
        </p>
        <p class="container">
          <span class="text_box">
            <!-- 标题 -->
            <span class="title_box">
              <a class="title" v-bind:href="goods_detail.goods_url">
                <span class="icon">
                  <img v-if="goods_detail.is_tmall" src="../images/tmall.png">
                  <img v-if="!goods_detail.is_tmall" src="../images/taobao.png">
                </span>
                {{goods_detail.goods_title}}
              </a>
            </span>
            <span class>
              <!-- 价格 -->
              <span class="org_price_box">
                <span class="org_price">
                  <span class="title">原价</span>
                  <span class="icon">￥</span>
                  <span class="num">{{goods_detail.goods_price}}</span>
                </span>
              </span>
              <!-- 特点 -->
              <span class="special_box">
                <!-- 淘抢购 -->
                <!-- <span class="qiang">购</span> -->
                <!-- 聚划算 -->
                <!-- <span class="ju">聚</span> -->
                <!-- 金牌卖家 -->
                <span v-if="goods_detail.is_gold" class="cover">
                  <span
                    class="jin"
                    title="金牌卖家"
                    @mouseover="showLayer(goods_detail,'is_show_jin')"
                    @mouseout="hideLayer(goods_detail,'is_show_jin')"
                  >金</span>
                  <transition name="layer">
                    <span v-show="goods_detail.is_show_jin" class="layer jin">
                      金牌卖家
                      <i class="i_jin icon-font i-play"></i>
                    </span>
                  </transition>
                </span>
                <!-- 极有家 -->
                <span v-if="goods_detail.is_ji" class="cover">
                  <span
                    class="ji"
                    title="极有家"
                    @mouseover="showLayer(goods_detail,'is_show_ji')"
                    @mouseout="hideLayer(goods_detail,'is_show_ji')"
                  >极</span>
                  <transition name="layer">
                    <span v-show="goods_detail.is_show_ji" class="layer ji">
                      极有家
                      <i class="i_ji icon-font i-play"></i>
                    </span>
                  </transition>
                </span>
                <!-- 海淘 -->
                <span v-if="goods_detail.is_hai" class="cover">
                  <span
                    class="hai"
                    title="海淘"
                    @mouseover="showLayer(goods_detail,'is_show_hai')"
                    @mouseout="hideLayer(goods_detail,'is_show_hai')"
                  >海</span>
                  <transition name="layer">
                    <span v-show="goods_detail.is_show_hai" class="layer hai">
                      海淘
                      <i class="i_hai icon-font i-play"></i>
                    </span>
                  </transition>
                </span>
                <!-- 运费险 -->
                <span v-if="goods_detail.is_yun" class="cover">
                  <span
                    class="xian"
                    title="运费险"
                    @mouseover="showLayer(goods_detail,'is_show_yun')"
                    @mouseout="hideLayer(goods_detail,'is_show_yun')"
                  >险</span>
                  <transition name="layer">
                    <span v-show="goods_detail.is_show_yun" class="layer xian">
                      运费险
                      <i class="i_xian icon-font i-play"></i>
                    </span>
                  </transition>
                </span>
              </span>
            </span>
            <!-- 券后  -->
            <span class="after_coupon_box">
              <span class="after_coupon">
                <span class="title">券后</span>
                <span class="icon">￥</span>
                <span class="num">{{goods_detail.after_coupon}}</span>
              </span>
            </span>
            <span class="sale_dsr_limit">
              <!-- 销量 -->
              <span class="sale_box">
                <span class="sale">
                  <span class="title">销量</span>
                  <span class="num">{{goods_detail.goods_sale}}</span>
                </span>
              </span>
              <!-- 评分 -->
              <span class="dsr_box">
                <span class="dsr">
                  <span class="title">店铺评分</span>
                  <span class="num">{{goods_detail.dsr}}</span>
                </span>
              </span>
            </span>
            <!-- 优惠券 -->
            <span class="quan_box">
              <span class="quan">
                <span class="title">领券</span>
                <a title="去领券" v-bind:href="goods_detail.coupon_url">
                  <span class="icon">￥</span>
                  <span class="num">{{goods_detail.coupon_price}}</span>
                </a>
              </span>
              <span class="quan_time">
                <span class="title">截止</span>
                <span class="date">{{goods_detail.coupon_end}}</span>
              </span>
            </span>
          </span>
        </p>
        <!--  -->
      </div>
      <!-- 推荐 -->
      <div class="recommend_box">
        <span class="title">相关推荐</span>
        <ul class="recommend_list">
          <li v-for="(item,index) in goods_list" v-bind:key="index">
            <span class="item">
              <!--  -->
              <span class="container">
                <!-- 图片 -->
                <span class="img_box">
                  <img v-bind:src="item.goods_pic">
                  <span class="link_box">
                    <a target="_blank" v-if="item.is_tmall">
                      <i class="icon-font i-right"></i>去天猫
                    </a>
                    <a target="_blank" v-if="!item.is_tmall">
                      <i class="icon-font i-right"></i>去淘宝
                    </a>
                    <a target="_blank">
                      <i class="icon-font i-installment"></i>去领券
                    </a>
                  </span>
                  <span v-if="item.is_ju" class="ju">正在参加聚划算</span>
                  <span v-if="item.is_qiang" class="qiang">正在参加淘抢购</span>
                </span>
              </span>
              <!--  -->
              <span class="container">
                <span class="text_box">
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
                        class="xian"
                        title="运费险"
                        @mouseover="showLayer(item,'is_show_yun')"
                        @mouseout="hideLayer(item,'is_show_yun')"
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
                  <!-- 券后价 -->
                  <span class="price">
                    <span class="price_title">券后</span>
                    <span class="icon">￥</span>
                    <span class="num">{{item.after_coupon}}</span>
                  </span>
                  <!-- 价格   end -->
                  <!-- 销量 -->
                  <span class="sale">
                    <span class="sale_container">
                      <span class="sale_title">销量</span>
                      <span class="num">{{item.goods_sale}}</span>
                    </span>
                  </span>
                  <!-- 销量   end -->
                  <!-- 优惠券 -->
                  <span class="quan_box">
                    <a class="quan" target="_blank" v-bind:href="item.coupon_url">
                      <span class="quan_container">
                        <span class="quan_title">领券</span>
                        <i>￥</i>
                        <span class="num">{{item.coupon_price}}</span>
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
      </div>
    </div>
    <ToTop :is_show_totop="is_show_totop" v-on:scrollToTop="scrollToTop"></ToTop>
  </div>
</template>
<script>
import ToTop from "./totop.vue";
import Axios from "axios";
export default {
  name: "DetailMiddle",
  components: {
    ToTop
  },
  data: function() {
    return {
      // 封面
      goods_pic: "/images/default.gif",
      // 商品详情对象
      goods_detail: {},
      // 推荐列表
      goods_list: [],
      // 商品ID
      goods_id: "541108477389",
      // 请求地址
      base_url: "http://localhost:8088",
      //   是否显示返回顶部按钮
      is_show_totop: false
    };
  },
  created: function() {
    this.initGoodsDetail();
  },
  methods: {
    // 初始化
    initGoodsDetail: function() {
      console.log(window.location.search);
      var temp = decodeURI(window.location.search);
      if (temp != "" && temp != null) {
        this.goods_id = temp.substring(10, temp.length);
      }
      console.log(this.goods_id);

      // 加上这个后退异常
      // var url = window.location.href;
      // var valiable = url.split('?')[0];
      // window.history.pushState({}, 0, valiable);
      // 加上这个后退异常

      if (this.goods_id != null && this.goods_id != "") {
        this.getGoodsDetail(this.loadData);
      }
    },
    // 跳转详情页
    goToDetail: function(goods_id) {
      window.location.href = "detail.html?goods_id=" + goods_id;
      console.log(goods_id);
    },
    // 返回顶部
    scrollToTop: function() {
      Velocity(
        document.documentElement,
        "scroll",
        {
          offset: 0
        },
        2000
      );
    },
    // 显示返回顶部按钮
    showToTop() {
      if (!this.is_show_totop) {
        this.is_show_totop = true;
      }
    },
    // 隐藏返回顶部按钮
    hideToTop() {
      if (this.is_show_totop) {
        this.is_show_totop = false;
      }
    },
    // 显示弹层
    showLayer: function(obj, type) {
      obj[type] = true;
    },
    // 隐藏弹层
    hideLayer: function(obj, type) {
      obj[type] = false;
    },
    // 获取商品详情
    getGoodsDetail(callback) {
      Axios({
        url: this.base_url + "/getGoodsDetail",
        method: "get",
        params: {
          goods_id: this.goods_id
        }
      })
        .then(response => {
          if (response != null) {
            callback(response);
          }
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 装填数据
    loadData(response) {
      if (response.data.goods_detail != null) {
        // 这里必须先添加属性再另goods_detial = e,否则页面上绑定的v-show/v-if全部失效
        // 应该是因为先=之后,页面就开始加载,后面新加的属性,就无法生效(为之庆幸)
        var e = response.data.goods_detail;
        e["is_show_jin"] = false;
        e["is_show_ji"] = false;
        e["is_show_hai"] = false;
        e["is_show_yun"] = false;
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
        this.goods_detail = e;
        console.log(this.goods_detail);
        this.goods_pic = e.goods_pic;
      }
      if (response.data.goods_list != null) {
        for (var i = 0; i < response.data.goods_list.length; ++i) {
          var e = response.data.goods_list[i];
          e["is_show_yun"] = false;
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
    }
    //
  }
};
</script>
<style>
/* -----------------------------------------------中部   开始----------------------------------- */
.mid {
  min-height: 500px;
  padding: 20px 0;
  font-size: 0;
  background-color: #f5f5f5;
}

.mid > .limit {
  max-width: 1200px;
  margin: auto;
}

/* 商品详情   start */
.mid .detail_box {
  display: block;
  font-size: 0;
}

.mid .detail_box > .container {
  display: inline-block;
  width: calc(100% - 300px);
  vertical-align: top;
}

.mid .detail_box > .container:first-child {
  width: 300px;
}

.mid .detail_box .img_box {
  position: relative;
  display: inline-block;
  width: 284px;
  padding: 8px;
  background-color: #ffffff;
}

.mid .detail_box .img_box > span {
  position: absolute;
  top: 8px;
  left: 8px;
  padding: 6px 10px;
  color: #ffffff;
  font-size: 15px;
}

.mid .detail_box .img_box .ju {
  background-color: #7144d5;
  background: -webkit-linear-gradient(right, #63aff9, #8b16f5);
  background: -o-linear-gradient(right, #63aff9, #8b16f5);
  background: -moz-linear-gradient(right, #63aff9, #8b16f5);
  background: linear-gradient(right, #63aff9, #8b16f5);
}

.mid .detail_box .img_box .qiang {
  background-color: #e63140;
  background: -webkit-linear-gradient(right, #f58b07, #f51616);
  background: -o-linear-gradient(right, #f58b07, #f51616);
  background: -moz-linear-gradient(right, #f58b07, #f51616);
  background: linear-gradient(right, #f58b07, #f51616);
}

.mid .detail_box .img_box > img {
  width: 100%;
}

.mid .detail_box .text_box {
  display: block;
  width: auto;
  height: 280px;
  padding: 10px;
  margin-left: 10px;
  background-color: #ffffff;
}

.mid .detail_box .text_box > span {
  display: block;
  /* padding: 0 8px; */
}

.mid .detail_box .text_box .title_box {
  display: block;
  text-align: left;
  font-size: 0;
}

.mid .detail_box .text_box .title_box .title {
  display: block;
  width: auto;
  font-size: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-decoration: none;
  color: black;
}

.mid .detail_box .text_box .title_box .title:hover {
  cursor: pointer;
  color: #ff4200;
}

.mid .detail_box .text_box .title_box .icon {
  display: inline-block;
  width: 18px;
  margin-right: 5px;
  vertical-align: middle;
}

.mid .detail_box .text_box .title_box .icon > img {
  width: 100%;
}

/* 原价 start */
.mid .detail_box .text_box .org_price_box {
  display: inline-block;
  width: 50%;
  margin-top: 15px;
  font-size: 0;
  vertical-align: top;
}

.mid .detail_box .org_price {
  display: block;
}

.mid .detail_box .org_price > span {
  display: inline-block;
  margin-left: 5px;
  color: #999999;
  font-size: 15px;
  line-height: 20px;
  vertical-align: middle;
}

.mid .detail_box .org_price > span:first-child {
  margin-left: 0;
}

.mid .detail_box .org_price .num {
  font-size: 20px;
  margin-left: 0;
}

/* 原价  end */
/* 标签  start */
.mid .detail_box .text_box .special_box {
  display: inline-block;
  width: 50%;
  margin-top: 12px;
  font-size: 0;
  text-align: right;
  vertical-align: top;
}

.mid .detail_box .text_box .special_box > span {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin: 3px 0 0 10px;
  font-size: 14px;
  line-height: 18px;
  color: #ffffff;
  text-align: center;
  vertical-align: top;
  border-radius: 3px;
}

.mid .detail_box .text_box .special_box > span:first-child {
  margin-left: 0;
}

.mid .detail_box .text_box .special_box .cover {
  position: relative;
}

.mid .detail_box .text_box .special_box .cover > span {
  display: block;
  border-radius: 3px;
}

.mid .detail_box .text_box .special_box .qiang {
  background-color: #fa5319;
}

.mid .detail_box .text_box .special_box .ju {
  background-color: #7144d5;
}

.mid .detail_box .text_box .special_box .jin {
  background-color: #efa21b;
}

.mid .detail_box .text_box .special_box .ji {
  background-color: #2b14d7;
}

.mid .detail_box .text_box .special_box .hai {
  background-color: #2878da;
}

.mid .detail_box .text_box .special_box .xian {
  background-color: #ff0036;
}

/* 弹层   start */
.mid .detail_box .text_box .special_box .cover > .layer {
  position: absolute;
  z-index: 99;
  top: 50%;
  left: 100%;
  display: block;
  width: 75px;
  height: 26px;
  margin: -12px 0 0 -102px;
  line-height: 25px;
  border-radius: 2px;
  font-size: 14px;
  box-shadow: 0 0 2px #999999;
}

.mid .detail_box .text_box .special_box .cover .layer i {
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

.mid .detail_box .text_box .special_box .cover .layer .i_jin {
  border-bottom-color: #efa21b;
}

.mid .detail_box .text_box .special_box .cover .layer .i_ji {
  border-bottom-color: #2b14d7;
}

.mid .detail_box .text_box .special_box .cover .layer .i_hai {
  border-bottom-color: #2878da;
}

.layer-enter-active {
  animation: layer-in 0.2s;
}

.layer-leave-active {
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

.test-enter-active {
  animation: test 0.2s;
}

.test-leave-active {
  animation: test 0.2s reverse;
}

@keyframes test {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}

/* 弹层   end */
/* 标签   end */
/* 券后  start */
.mid .detail_box .text_box .after_coupon_box {
  display: block;
  margin-top: 10px;
  font-size: 0;
  padding-top: 8px;
  /* background-color: #f8f8f8; */
}

.mid .detail_box .text_box .after_coupon {
  display: block;
  margin-top: 5px;
}

.mid .detail_box .text_box .after_coupon > span {
  display: inline-block;
  margin-left: 5px;
  color: #ff0036;
  font-size: 15px;
  line-height: 1;
  vertical-align: middle;
}

.mid .detail_box .text_box .after_coupon > span:first-child {
  margin-left: 0;
}

.mid .detail_box .text_box .after_coupon .num {
  margin-left: 0;
  font-size: 25px;
  font-weight: bold;
}

/* 券后  end */
/* 销量   start */
.mid .detail_box .text_box .sale_box {
  display: inline-block;
  width: 50%;
  margin-top: 20px;
  vertical-align: top;
}

.mid .detail_box .text_box .sale {
  display: block;
  font-size: 0;
}

.mid .detail_box .text_box .sale > span {
  display: inline-block;
  margin-left: 10px;
  font-size: 15px;
  color: #666666;
  line-height: 1;
  vertical-align: middle;
}

.mid .detail_box .text_box .sale > span:first-child {
  margin-left: 0;
}

.mid .detail_box .text_box .sale .num {
  font-size: 25px;
}

/* 销量   end */
/* 评分   start */
.mid .detail_box .text_box .dsr_box {
  display: inline-block;
  width: 50%;
  margin-top: -30px;
  text-align: right;
}

.mid .detail_box .text_box .dsr {
  display: inline-block;
  width: 100px;
  font-size: 0;
  border-radius: 5px;
  border: 1px solid #fa5319;
  background-color: #ffffff;
}

.mid .detail_box .text_box .dsr > span {
  display: block;
  width: 100%;
  font-size: 15px;
  text-align: center;
  color: #666666;
  line-height: 1;
  padding: 10px 0;
}

.mid .detail_box .text_box .dsr .title {
  color: #ffffff;
  border-radius: 3px 3px 0 0;
  background-color: #fa5319;
}

.mid .detail_box .text_box .dsr .num {
  width: 98px;
  color: #fa5319;
  font-size: 18px;
}

/* 评分   end */
/* 优惠券  start */
.mid .detail_box .text_box .quan_box {
  display: block;
  margin-top: 90px;
  font-size: 0;
}

.mid .detail_box .text_box .quan_box > span {
  display: inline-block;
  font-size: 0;
  vertical-align: top;
}

.mid .detail_box .text_box .quan > span {
  display: inline-block;
  vertical-align: middle;
}

.mid .detail_box .text_box .quan > a {
  display: inline-block;
  width: 100px;
  margin-left: 8px;
  font-size: 0;
  vertical-align: middle;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #fa5319;
}

.mid .detail_box .text_box .quan > a:hover {
  background-color: #fa5319;
}

.mid .detail_box .text_box .quan > a:hover .icon {
  color: #ffffff;
}

.mid .detail_box .text_box .quan > a:hover .num {
  color: #ffffff;
}

.mid .detail_box .text_box .quan .title {
  font-size: 18px;
  color: #fa5319;
}

.mid .detail_box .text_box .quan > a > span {
  display: inline-block;
  vertical-align: middle;
  color: #fa5319;
}

.mid .detail_box .text_box .quan .icon {
  font-size: 18px;
}

.mid .detail_box .text_box .quan .num {
  font-size: 25px;
}

.mid .detail_box .text_box .quan_time {
  display: inline-block;
  margin-left: 20px;
  font-size: 0;
}

.mid .detail_box .text_box .quan_time > span {
  display: inline-block;
  font-size: 18px;
  color: #999999;
  line-height: 35px;
}

.mid .detail_box .text_box .quan_time .date {
  margin-left: 10px;
}

/* 优惠券   end */
@media (max-width: 1200px) {
  .mid .detail_box .text_box .after_coupon_box {
    background-color: #ffffff;
  }

  .mid .detail_box .text_box .sale_dsr_limit {
    background-color: #ffffff;
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  .mid {
    padding: 20px;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .mid {
    padding: 20px;
  }
}

@media (min-width: 768px) {
  .mid .detail_box {
    padding: 0 5px;
  }
}

@media (max-width: 767px) {
  .mid {
    padding: 20px 0;
  }

  .mid .detail_box > .container {
    display: block;
    width: 100%;
  }

  .mid .detail_box > .container:first-child {
    width: 100%;
  }

  .mid .detail_box .img_box {
    position: relative;
    display: block;
    width: auto;
    padding: 8px;
    margin: auto;
    background-color: #ffffff;
    /* width: 188px;
        padding: 6px; */
  }

  .mid .detail_box .img_box > img {
    display: block;
    margin: auto;
  }

  .mid .detail_box .text_box {
    margin-left: 0;
    height: auto;
    padding: 3px 8px 15px 8px;
  }

  .mid .detail_box .text_box > span {
    padding: 0;
  }

  .mid .detail_box .text_box .sale_dsr_limit {
    padding: 0;
  }

  .mid .detail_box .text_box .quan_box {
    margin-top: 20px;
  }

  .mid .detail_box .text_box .quan_time {
    margin-left: 15px;
  }

  .mid .detail_box .text_box .quan_time .date {
    margin-left: 5px;
  }

  .mid .detail_box .text_box .title_box {
    margin-top: 0;
  }

  .mid .detail_box .text_box > span {
    margin-top: 10px;
  }

  .mid .detail_box .text_box .org_price_box {
    margin-top: 0;
  }

  .mid .detail_box .text_box .special_box {
    margin-top: 0;
  }

  .mid .detail_box .text_box .after_coupon_box {
    padding: 0;
    margin-top: 15px;
  }

  .mid .detail_box .text_box .sale_box {
    margin-top: 6px;
  }

  .mid .detail_box .text_box .dsr_box {
    margin-top: -35px;
  }

  .mid .detail_box .text_box .dsr > span {
    padding: 8px 0;
  }
}

@media (min-width: 500px) and (max-width: 767px) {
  .mid .detail_box .text_box {
    padding: 5px 12px 15px 12px;
  }

  .mid .detail_box .img_box {
    padding: 12px 12px 5px 12px;
  }

  .mid .detail_box .img_box > span {
    top: 12px;
    left: 12px;
  }
}

/* 商品详情   end */

/* 相关推荐   start */
.mid .recommend_box {
  display: block;
  margin-top: 20px;
  font-size: 20px;
  /* padding-left: 8px; */
  color: #666666;
}

.mid .recommend_box > .title {
  display: block;
  padding-left: 8px;
}

.mid .recommend_box > .recommend_list {
  font-size: 0;
  text-align: left;
}

.mid .recommend_box .recommend_list > li {
  display: inline-block;
  margin-top: 20px;
  width: 25%;
  vertical-align: top;
}

.mid .recommend_box .recommend_list > li .item {
  position: relative;
  display: block;
  width: 95%;
  margin: auto;
  background-color: #ffffff;
}

.mid .recommend_box .item .container {
  position: relative;
  display: block;
  padding: 6px;
  margin: auto;
}

.mid .recommend_box .item .container .img_box {
  position: relative;
  display: block;
}

.mid .recommend_box .item .container .img_box > img {
  width: 100%;
}

.mid .recommend_box .item .container .img_box .link_box {
  position: relative;
  display: none;
  height: 30px;
  margin-top: -30px;
  font-size: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.mid .recommend_box .item:hover {
  box-shadow: 0 0 8px #888888;
}

.mid .recommend_box .item:hover .link_box {
  display: block !important;
}

.mid .recommend_box .item .container .img_box .link_box > a {
  display: inline-block;
  width: 50%;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 14px;
  color: #ffffff;
  text-decoration: none;
}

.mid .recommend_box .item .container .img_box .link_box > a:hover {
  cursor: pointer;
  background-color: #fa5319;
}

.mid .recommend_box .item .container .img_box .link_box > a i {
  margin-right: 3px;
}

.mid .recommend_box .item .container .img_box .ju {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px;
  color: #ffffff;
  font-size: 14px;
  /* border-radius: 3px; */
  background-color: #7144d5;
  background: -webkit-linear-gradient(right, #63aff9, #8b16f5);
  background: -o-linear-gradient(right, #63aff9, #8b16f5);
  background: -moz-linear-gradient(right, #63aff9, #8b16f5);
  background: linear-gradient(right, #63aff9, #8b16f5);
}

.mid .recommend_box .item .container .img_box .qiang {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px;
  color: #ffffff;
  font-size: 14px;
  /* border-radius: 3px; */
  background-color: #e63140;
  background: -webkit-linear-gradient(right, #f58b07, #f51616);
  background: -o-linear-gradient(right, #f58b07, #f51616);
  background: -moz-linear-gradient(right, #f58b07, #f51616);
  background: linear-gradient(right, #f58b07, #f51616);
}

.mid .recommend_box .item .container:last-child {
  padding-top: 0;
}

.mid .recommend_box .item .container .text_box {
  position: relative;
  display: block;
  font-size: 0;
}

.mid .recommend_box .item .text_box .title {
  position: relative;
  display: block;
  font-size: 15px;
  line-height: 25px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.mid .recommend_box .item .text_box .title:hover {
  cursor: pointer;
  color: #ff4200;
}

.mid .recommend_box .item .text_box .title > img {
  display: inline-block;
  width: 18px;
  height: 18px;
  margin: -3px 2px 0 0;
  vertical-align: middle;
}

/* 原价   start */
.mid .recommend_box .item .text_box .org_price {
  display: block;
  font-size: 0;
  margin-top: 5px;
  padding-right: 3px;
}

.mid .recommend_box .item .text_box .org_price > span {
  display: inline-block;
  /* vertical-align: middle; */
}

.mid .recommend_box .item .text_box .org_price .box > span {
  vertical-align: middle;
}

.mid .recommend_box .item .text_box .org_price .box {
  width: 80%;
}

.mid .recommend_box .item .text_box .org_price .tag_box {
  position: relative;
  width: 20%;
}

.mid .recommend_box .item .text_box .org_price .tag_box > .layer {
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
}

.mid .recommend_box .item .text_box .org_price .tag_box > .layer i {
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

.mid .recommend_box .item .text_box .org_price .price_title {
  font-size: 14px;
  color: #999999;
}

.mid .recommend_box .item .text_box .org_price .icon {
  font-size: 14px;
  color: #999999;
  margin-left: 3px;
}

.mid .recommend_box .item .text_box .org_price .num {
  margin-left: 2px;
  font-size: 15px;
  color: #999999;
}

.mid .recommend_box .item .text_box .tag_box {
  text-align: right;
}

.mid .recommend_box .item .text_box .tag_box > span {
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

/* 原价   end */
/* 券后   start */
.mid .recommend_box .item .text_box .price {
  display: block;
  font-size: 0;
  margin-top: 5px;
}

.mid .recommend_box .item .text_box .price > span {
  display: inline-block;
  vertical-align: middle;
  color: #ff0036;
  line-height: 20px;
}

.mid .recommend_box .item .text_box .price .price_title {
  font-size: 14px;
}

.mid .recommend_box .item .text_box .price .icon {
  font-size: 14px;
  margin-left: 3px;
}

.mid .recommend_box .item .text_box .price .num {
  margin-left: 2px;
  font-size: 18px;
  font-weight: bold;
}

/* 券后   end */
/* 销量   start */
.mid .recommend_box .item .text_box .sale {
  display: block;
  font-size: 0;
  margin-top: 5px;
}

.mid .recommend_box .item .text_box .sale > span {
  display: inline-block;
  color: #666666;
}

.mid .recommend_box .item .text_box .sale_container > span {
  vertical-align: middle;
}

.mid .recommend_box .item .text_box .sale .sale_title {
  font-size: 14px;
}

.mid .recommend_box .item .text_box .sale .num {
  margin-left: 3px;
  font-size: 18px;
}

/* 销量   end */
/* 领券   start */
.mid .recommend_box .item .text_box .quan_box {
  display: block;
  margin-top: 3px;
  text-align: right;
}

.mid .recommend_box .item .text_box .quan {
  display: inline-block;
  color: #ff4200;
  text-align: right;
}

.mid .recommend_box .item .text_box .quan .quan_title {
  display: inline-block;
  font-size: 14px;
  vertical-align: middle;
}

.mid .recommend_box .item .text_box .quan i {
  display: inline-block;
  font-style: normal;
  font-size: 15px;
  margin-left: 3px;
  /* margin-top: 2px; */
  line-height: 1;
  vertical-align: middle;
}

.mid .recommend_box .item .text_box .quan .num {
  display: inline-block;
  margin-left: 0;
  font-size: 18px;
  font-weight: bold;
  line-height: 20px;
  vertical-align: middle;
}

.mid .recommend_box .item .text_box .sale_container {
  display: block;
}

.mid .recommend_box .item .text_box .quan_container {
  display: inline-block;
}

@media (max-width: 992px) {
  .mid .recommend_box .item:hover .link_box {
    display: none !important;
  }
}

@media (min-width: 450px) and (max-width: 768px) {
  .mid .recommend_box > .title {
    padding-left: 10px;
  }

  .mid .recommend_box .recommend_list {
    padding: 0 4px;
    margin-top: 10px;
  }

  .mid .recommend_box .recommend_list > li {
    width: 50%;
    margin-top: 8px;
  }

  .mid .recommend_box .recommend_list > li .item {
    width: 97%;
  }
}

@media (max-width: 449px) {
  .mid .recommend_box {
    padding: 0;
  }

  .mid .recommend_box > .title {
    margin-bottom: 19px;
  }

  .mid .recommend_box .recommend_list > li {
    width: 100%;
    margin-top: 1px;
  }

  .mid .recommend_box .recommend_list > li .item {
    width: 100%;
    font-size: 0;
    box-shadow: none;
  }

  .mid .recommend_box .item .container {
    display: inline-block;
    margin-left: 0;
    vertical-align: top;
  }

  .mid .recommend_box .item .container:first-child {
    width: 140px;
    height: 140px;
  }

  .mid .recommend_box .item .container:last-child {
    width: calc(100% - 152px);
    height: 152px;
    padding: 0;
  }

  .mid .recommend_box .item .container .text_box {
    height: 140px;
    padding: 6px 6px 6px 0;
  }

  .mid .recommend_box .item .container .text_box > span {
    margin-top: 5px;
  }

  .mid .recommend_box .item .container .text_box > .sale {
    position: relative;
    display: inline-block;
    width: 50%;
    margin: 10px 0 0 3px !important;
    vertical-align: middle;
    text-align: left;
  }

  .mid .recommend_box .item .container .text_box .sale_container {
    display: inline-block;
    max-width: 100px;
  }

  .mid .recommend_box .item .container .text_box .sale_container > span {
    display: block;
    text-align: center;
    margin: 2px 0 0 0;
  }

  .mid .recommend_box .item .text_box > .quan_box {
    position: relative;
    display: inline-block;
    width: calc(49% - 3px);
    margin-top: 10px !important;
    vertical-align: middle;
    text-align: right;
  }

  .mid .recommend_box .item .text_box .quan {
    width: 100%;
    max-width: 80px;
  }

  .mid .recommend_box .item .text_box .quan_container {
    display: inline-block;
    width: 100%;
    min-height: 40px;
    border-radius: 5px;
    text-align: center;
    border: 1px solid #fa5319;
  }

  .mid .recommend_box .item .text_box .quan .quan_title {
    display: block;
    height: 20px;
    text-align: center;
    color: #ffffff;
    line-height: 20px;
    padding: 3px 0;
    border-radius: 2px 2px 0 0;
    background-color: #fa5319;
  }

  .mid .recommend_box .item .text_box .quan i {
    margin: 0;
  }

  .mid .recommend_box .item .text_box .quan .num {
    padding: 3px 0;
  }
}

/* 相关推荐   end */
/* -----------------------------------------------中部   结束----------------------------------- */
</style>
