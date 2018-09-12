<template>
  <el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </el-aside>
    <el-main>
      <router-view/>
    </el-main>
  </el-container>
</el-container>
</template>
<script>
export default {
  name: 'home',
  data() {
    return {};
  },
};
</script>

<style lang="stylus">
body
    margin 0
.el-header, .el-footer
    background-color #B3C0D1
    color #333
    line-height 60px
.el-aside
    background-color #D3DCE6
.el-main
    background-color #E9EEF3
</style>
