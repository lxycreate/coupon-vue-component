<template>
  <div id="app">
    <HeaderComponent></HeaderComponent>
  </div>
</template>
<script>
import HeaderComponent from "./components/header.vue";
import Velocity from "velocity-animate";

export default {
  name: "app",
  components: {
    HeaderComponent
  },
  props: {
    // 存储ajax参数的对象
    ajax_pars: {
      default: function() {
        return {};
      }
    },
    // 可以进行ajax请求的标志
    can_ajax: {
      default: true
    }
  },
  methods: {
    // 向ajax_pars中添加参数
    addProperty: function(pro_name, pro_value) {
      if (pro_name != undefined && pro_value != undefined && this.can_ajax) {
        // loadGoods(pro_name);
      }
    },
    // 从ajax_pars中删除属性
    deleteProperty: function(pro_name) {
      if (this.ajax_pars.hasOwnProperty(pro_name)&& this.can_ajax) {
        delete this.ajax_pars[pro_name];
        // loadGoods(pro_name);
      }
    }
  }
};
console.log(Velocity);
</script>