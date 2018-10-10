<template>
  <header class="lx-header">
    <div class="logo" @click="showService">
      <i class="fa fa-apple"></i> 苹果服务系统
      <a href="javascript:;"><i class="fa fa-angle-down"></i></a>
    </div>
    <div>
      <a href="javascript:;" class="item circle">
        <i class="fa fa-bell-o"></i>
      </a>
      <el-dropdown placement="bottom-end">
        <a href="javascript:;" class="item">
        <i class="fa fa-user"></i> 雄黎明 <i class="fa fa-angle-down"></i>
      </a>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <i class="fa fa-user"></i> 用户信息
        </el-dropdown-item>
        <el-dropdown-item>
          <i class="fa fa-cog"></i> 编好设置
        </el-dropdown-item>
        <el-dropdown-item>
          <i class="fa fa-sign-out"></i> 退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
  </header>
</template>
<script>
import { SET_ATTR } from '@/store/';

export default {
  name: 'Header',
  methods: {
    showService() {
      this.$store.commit(SET_ATTR, { visibleServiceList: !this.$store.state.visibleServiceList });
    },
  },
};
</script>

<style lang="stylus" scoped>
.logo
  cursor pointer
  a
    margin-left 5px
    color #AAA
    transition all 0.3s
  &:hover
    a
      color #CCC
.item
  background #FFF
  border-radius 15px
  padding 2px 15px
  line-height 1
  font-size 14px
  border 1px dashed transparent
  margin-left 10px
  &:hover
    border-color #aaa
</style>
