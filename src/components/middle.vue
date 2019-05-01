<template>
  <div class="middle">
    <FilterComponent/>
    <Goods :goods_list="goods_list"></Goods>
  </div>
</template>

<script>
import FilterComponent from "./filter.vue";
import Goods from "./goods.vue";
export default {
  name: "MiddleComponent",
  components: {
    FilterComponent,
    Goods
  },
  props: {
    goods_list: Array
  },
  data: function() {
    return {};
  },
  created: function() {},
  methods: {}
};
</script>

<style>
.middle {
  min-height: 500px;
  margin: auto;
  padding: 20px 0 20px 0;
  background-color: #f5f5f5;
}
</style>
