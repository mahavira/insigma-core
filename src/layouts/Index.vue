<template>
  <el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside>
      <el-menu
        :router="true"
        background-color="#D3DCE6"
        active-text-color="#409EFF">
        <el-menu-item index="/">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
        <el-menu-item index="/about" :route="{path: '/about'}">
          <i class="el-icon-document"></i>
          <span slot="title">导航三</span>
        </el-menu-item>
        <el-menu-item index="/login">
          <i class="el-icon-setting"></i>
          <span slot="title">登录</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <el-tabs type="card">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
      </el-tabs>
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
  background-color #FFF
</style>
