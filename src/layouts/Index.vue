<template>
<el-container direction="vertical">
  <lx-header/>
  <el-container>
    <el-aside width="240px">
      <lx-menu/>
    </el-aside>
    <el-container direction="vertical">
      <div>
        <lx-tabs/>
      </div>
      <el-main>
        <lx-keep-alive>
          <router-view/>
        </lx-keep-alive>
      </el-main>
    </el-container>
  </el-container>
</el-container>
</template>
<script>
import LxHeader from './Header.vue';
import LxMenu from './Menu.vue';
import LxTabs from '../components/Tabs.vue';
import LxKeepAlive from '../components/LxKeepAlive';

export default {
  name: 'home',
  components: {
    LxHeader,
    LxMenu,
    LxTabs,
    LxKeepAlive,
  },
  created() {
    const { replace } = this.$router;
    this.$router.replace = (location, onComplete, onAbort) => {
      if (this.$route.path !== location.path) {
        this.$router.tmp = {
          replace: true,
          key: this.$store.state.tabs.key,
        };
      }
      replace.call(this.$router, location, onComplete, onAbort);
    };
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style lang="stylus">
body, html
  margin 0
  height 100%
.el-container
  height 100%
.el-header, .el-footer
  background-color #B3C0D1
  color #333
  line-height 60px
.el-aside
  background-color #D3DCE6
.el-main
  background-color #FFF
</style>
