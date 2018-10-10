<template>
  <label>
    <el-submenu :index="route.path"
      v-if="route.children && route.children.length">
      <template slot="title">
        <i :class="route.icon"></i>
        <span>{{route.title}}</span>
      </template>
      <menu-item v-for="item in route.children" :key="item.path" :route="item"></menu-item>
    </el-submenu>
    <el-menu-item v-else
      :index="route.path">
        <i :class="route.icon"></i>
      <span>{{route.title}}</span>
    </el-menu-item>
  </label>
</template>
<script>
export default {
  name: 'menu-item',
  props: {
    route: {
      type: Object,
    },
  },
};
</script>

