<template>
  <label>
    <el-submenu :index="route.path"
      v-if="route.children && route.children.length">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{route.path}}</span>
      </template>
      <menu-item v-for="item in route.children" :key="item.path" :route="item"></menu-item>
    </el-submenu>
    <el-menu-item v-else
      :index="route.path=='/dashboard/about/:id'?'/dashboard/about/1':route.path">
       <i class="el-icon-location"></i>
      <span>{{route.path}}</span>
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

