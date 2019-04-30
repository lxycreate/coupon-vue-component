<template>
  <div id="app">
    <HeaderComponent></HeaderComponent>
  </div>
</template>
<script>
import HeaderComponent from "./components/header.vue";

export default {
  name: "app",
  components: {
    HeaderComponent
  },
  props: {
    // 可以进行ajax操作的标志
    can_ajax: {
      default: true
    }
  },
  methods: {
  }
};
</script>