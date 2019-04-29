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
  }
};
</script>