<template>
  <lx-keep-alive>
    <router-view/>
  </lx-keep-alive>
</template>
<script>
import LxKeepAlive from '../components/LxKeepAlive';

export default {
  name: 'Main',
  components: {
    LxKeepAlive,
  },
};
</script>

<style lang="stylus">
.el-main
  background-color #FFF
</style>
