<template>
  <!-- 商品区域   START -->
  <div class="goods_area js_goods_area" v-bind:class="{toggle_goods_area:toggle_list}" v-cloak>
    <!-- 加载动画 -->
    <span v-show="is_loading" class="loading">加载中...</span>
    <!-- 商品列表   START -->
    <ul class="goods_list js_goods_list" v-bind:class="{toggle_goods_list:toggle_list}">
      <li v-for="(item,index) in list_items" v-bind:class="{toggle_li:toggle_list}" v-bind:key="index">
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
    <span v-show="is_show_totop" class="to_top" @click="scrollToTop">
      <i class="icon-font i-v-top"></i>
    </span>
  </div>
  <!-- 商品区域   END -->
</template>

<script>
export default {
  name: "Goods",
  components: {},
  props: {},
  data: function() {
    return {};
  },
  created: function() {},
  methods: {}
};
</script>

<style>
</style>
