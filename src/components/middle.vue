<template>
  <div class="middle">
    <FilterComponent/>
  </div>
</template>

<script>
import FilterComponent from "./filter.vue";
export default {
  name: "Middle",
  components: {
    FilterComponent
  },
  props: {},
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
