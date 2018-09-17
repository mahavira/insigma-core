<template>
  <el-menu
    :router="true"
    :default-active="$route.path"
    background-color="#D3DCE6">
      <menu-item v-for="item in routes" :key="item.path" :route="item">{{a}}</menu-item>
  </el-menu>
</template>
<script>
import MenuItem from './MenuItem.vue';

export default {
  name: 'home',
  components: {
    MenuItem,
  },
  data() {
    return {
      a: 1,
    };
  },
  computed: {
    routes() {
      return this.$router.options.routes;
    },
  },
  mounted() {
    setInterval(() => {
      this.a += 1;
    }, 1000);
  },
};
</script>
