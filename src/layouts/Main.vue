<template>
  <lx-keep-alive>
    <router-view/>
  </lx-keep-alive>
</template>
<script>
import LxKeepAlive from '../components/LxKeepAlive';
import LxRouterView from '../components/LxRouterView';

export default {
  name: 'Main',
  components: {
    LxKeepAlive,
    LxRouterView,
  },
};
</script>

<style lang="stylus">
.el-main
  background-color #FFF
</style>
