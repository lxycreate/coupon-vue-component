<template>
  <span v-show="is_show_totop" class="to_top" @click="scrollToTop">
    <i class="icon-font i-v-top"></i>
  </span>
</template>
<script>
export default {
  name: "ToTop",
  props: { is_show_totop: Boolean },
  methods: {
    scrollToTop() {
      this.$emit("scrollToTop");
    }
  }
};
</script>
<style>
.to_top {
  position: fixed;
  display: block;
  z-index: 99;
  top: 100%;
  left: 100%;
  width: 45px;
  height: 45px;
  margin: -60px 0 0 -60px;
  border-radius: 50%;
  text-align: center;
  line-height: 43px;
  background-color: rgba(0, 0, 0, 0.5);
}
.to_top:hover {
  cursor: pointer;
  background-color: #fa5319;
}
.to_top > i {
  margin-top: 10px;
  font-size: 23px;
  color: #ffffff;
  font-weight: bolder;
}
</style>

