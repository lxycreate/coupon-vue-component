<template>
  <!-- 导航   START -->
  <div class="header">
    <!-- logo和搜索框   START -->
    <div v-bind:class="{ceil_fixed : is_fixed_ceil}" class="ceil_box js_ceil_box">
      <div class="header_logo">
        <a v-show="is_show_logo" class="logo_box" href="index.html">
          <img src="../images/logo.png">
        </a>
        <form
          v-bind:class="{no_margin : !is_show_logo}"
          class="search_input js_search_input"
          onsubmit="return search()"
        >
          <input v-model="search_word" placeholder="商品标题、关键字">
          <i class="icon-font i-search-pc" @click="search"></i>
        </form>
      </div>
    </div>
    <!-- 当搜索框吸顶时，顶替搜索框，防止页面元素上移 -->
    <p v-show="is_fixed_ceil" class="ceil_filler js_ceil_filler"></p>
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
    // 是否显示logo
    is_show_logo: {
      default: true
    },
    // 搜索框是否吸顶
    is_fixed_ceil: {
      default: false
    },
    // 搜索词
    search_word: {
      default: ""
    }
  },
  created: function() {
   
  },
  methods: {
    search: function() {
      if (now_page_name != "search" && this.search_word != "") {
        window.location.href =
          "search.html?search=" + encodeURI(this.search_word);
      }

      if (now_page_name == "search" && this.search_word != "") {
        // 不支持后退
        scrollToTopDirect();
        addProperty("word", this.search_word);
        // 支持后退
        // window.location.href = "search.html?search=" + encodeURI(this.search_word);
      }
      if (now_page_name == "search" && this.search_word == "") {
        // 不支持后退
        search_data["word"] = "";
        deleteProperty("word");
        // 支持后退
        // window.location.href = "search.html?search=all";
      }
      return false;
    }
  }
};
</script>

<style>
/* -----------------------------------------------导航   开始----------------------------------- */
.header {
  position: relative;
  margin: 40px auto 0 auto;
}

.header .ceil_box {
  width: 100%;
  max-width: 1920px;
  min-height: 35px;
  margin: auto;
  background-color: #ffffff;
}

.header .header_logo {
  max-width: 1200px;
  margin: auto;
}

.header .ceil_filler {
  height: 35px;
}

.ceil_fixed {
  position: fixed;
  top: 0;
  padding: 10px 0 15px 0;
  z-index: 100;
}

.header .logo_box {
  position: absolute;
  display: block;
  width: 120px;
  margin-top: -5px;
  margin-left: 10px;
  text-decoration: none;
}

.header .logo_box > img {
  width: 100%;
}

/* 搜索框   开始 */
.header .search_input {
  position: relative;
  width: 440px;
  height: 35px;
  margin: auto;
}

/* 为了实现小屏幕时的吸顶效果 */
.no_margin {
  margin-top: 0 !important;
}

.header .search_input > input {
  display: block;
  width: 100%;
  height: 35px;
  text-indent: 0.5em;
  outline: none;
  font-size: 16px;
  transition: all 0.5s ease;
  border: 2px solid #fa5319;
}

.header .search_input > input:focus {
  box-shadow: 0 0 5px #fa5319;
}

.header .search_input > i {
  position: absolute;
  display: block;
  top: 0;
  left: 100%;
  width: 80px;
  height: 35px;
  padding: 2px;
  margin-left: -80px;
  color: #ffffff;
  line-height: 35px;
  text-align: center;
  font-size: 23px;
  font-weight: 800;
  background-color: #fa5319;
}

.header .search_input > i:hover {
  cursor: pointer;
  background-color: #e54107;
}

/* 搜索框   结束 */
/* 导航按钮   开始 */
.header .header_btns {
  margin: 40px auto 0 auto;
  background-color: #fa5319;
  height: auto;
}

.header .header_btns .btn_box {
  max-width: 1200px;
  margin: auto;
  font-size: 0;
}

.header .header_btns .btn_box > a {
  display: inline-block;
  width: 100px;
  line-height: 40px;
  font-size: 18px;
  color: #ffffff;
  margin-left: 10px;
  text-align: center;
  text-decoration: none;
}

.header .header_btns .btn_box > a:first-child {
  margin-left: 0;
}

.header .header_btns .btn_box > a:hover {
  cursor: pointer;
  background-color: #e44108;
}

/* 导航按钮   结束 */
@media (min-width: 992px) and (max-width: 1199px) {
  .header .logo_box {
    margin-left: 30px;
  }

  .header .header_btns .btn_box > a:first-child {
    margin-left: 20px;
  }
}

@media (min-width: 767px) and (max-width: 991px) {
  .header {
    margin-top: 30px;
  }

  .header .ceil_filler {
    height: 110px;
  }

  .header .logo_box {
    position: relative;
    margin: auto;
    width: 110px;
  }

  .header .search_input {
    margin-top: 30px;
  }

  .header .header_btns .btn_box > a:first-child {
    margin-left: 20px;
  }
}

@media (max-width: 767px) {
  .header {
    margin-top: 20px;
  }

  .header .header_btns .btn_box {
    padding: 0 10px;
  }

  .header .header_btns .btn_box > a {
    margin-left: 0;
  }

  .header .ceil_filler {
    height: 110px;
  }

  .header .logo_box {
    position: relative;
    margin: 0 auto auto auto;
    width: 100px;
  }

  .header .search_input {
    width: auto;
    padding: 0 10px 0 6px;
    max-width: 440px;
    margin-top: 20px;
  }

  .header .search_input > i {
    width: 70px;
    margin-left: -80px;
  }

  .header .header_btns {
    margin-top: 30px;
  }
}

/* -----------------------------------------------导航   结束----------------------------------- */
</style>
