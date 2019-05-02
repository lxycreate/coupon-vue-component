<template>
  <div class="footer">
    <span class="txt">本站所有数据均来自阿里巴巴</span>
  </div>
</template>

<script>
export default {
  name: "FooterComponent"
};
</script>

<style>
.footer {
  position: relative;
  min-height: 100px;
  background-color: #eeeeee;
}

.footer .txt {
  position: relative;
  display: block;
  padding-top: 43px;
  text-align: center;
  line-height: 1;
  font-size: 18px;
  color: #666666;
}
</style>
