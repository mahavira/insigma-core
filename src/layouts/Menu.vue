<template>
  <el-menu
    :router="true"
    :default-active="$route.path"
    background-color="#E7EEF2">
      <menu-item v-for="item in menus" :key="item.path" :route="item">{{a}}</menu-item>
  </el-menu>
</template>
<script>
import MenuItem from './MenuItem.vue';
import menu from '../config/menu';

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
    menus() {
      return menu;
    },
  },
  mounted() {
    setInterval(() => {
      this.a += 1;
    }, 1000);
  },
};
</script>
