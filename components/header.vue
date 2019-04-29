<template>
  <!-- 导航   START -->
  <div class="header">
    <!-- logo和搜索框   START -->
    <div v-bind:class="{ceil_fixed:is_fixed}" class="ceil_box js_ceil_box" v-cloak>
      <div class="header_logo">
        <a v-show="is_show" class="logo_box" href="main.html">
          <img src="../images/logo.png">
        </a>
        <form
          v-bind:class="{no_margin : !is_show}"
          class="search_input js_search_input"
          onsubmit="return search()"
        >
          <input v-model="search_word" placeholder="商品标题、关键字">
          <i class="icon-font i-search-pc" @click="search"></i>
        </form>
      </div>
    </div>
    <p v-show="is_show" class="ceil_filler js_ceil_filler" v-cloak></p>
    <!-- logo和搜索框   END -->

    <!-- 按钮   START -->
    <div class="header_btns">
      <p class="btn_box">
        <a class="cur all" href="main.html">全网商品</a>
        <a class="bargain" href="bargain.html">特惠商品</a>
        <a class="hundred" href="hundred.html">百元精品</a>
      </p>
    </div>

    <!-- 按钮   END -->
  </div>
  <!-- 导航   END -->
</template>

<script>
export default {
  name: "HeaderComponent",
  props: {
    
  }
};
</script>