<template>
  <div id="app">
    <HeaderComponent v-on:addProperty="addProperty"></HeaderComponent>
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
    // ajax参数
    ajax_pars: {
      default: () => ({})
    },
    // 可以进行ajax操作的标志
    can_ajax: {
      default: true
    }
  },
  methods: {
    // 向ajax_par中添加新的属性
    addProperty: function(pro_name, pro_value) {
      this.ajax_pars[pro_name] = pro_value;
      if (this.can_ajax) {
      }
    },
    test: function() {
      console.log("testApp");
    }
  }
};
</script>