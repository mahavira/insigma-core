<template>
  <el-container>
  <el-header>Header</el-header>
  <el-container>
    <el-aside width="240px">
      <el-menu
        :router="true"
        :default-active="$route.path"
        background-color="#D3DCE6">
          <menu-item v-for="item in routes" :key="item.path" :route="item"></menu-item>
      </el-menu>
    </el-aside>
    <el-container direction="vertical">
      <el-tabs closable
      @tab-remove="onTabRemove"
      @tab-click="onTabClick"
      :value="$route.name">
        <el-tab-pane v-for="(tab,key) in tabs"
        :key="key"
        :label="tab.name"
        :name="tab.name"
        :closable="true"
        />
      </el-tabs>
      <el-main>
      <pk-keep-alive :updateComponentsKey="updateKey" ref="keepAlive">
        <router-view/>
      </pk-keep-alive>
    </el-main>
    </el-container>

  </el-container>
</el-container>
</template>
<script>
import Vue from 'vue';
import MenuItem from './MenuItem.vue';
import PkKeepAlive from '../components/KeepAlive';

export default {
  name: 'home',
  components: { MenuItem, PkKeepAlive },
  data() {
    return {
      tabs: {},
    };
  },
  watch: {
    $route() {},
  },
  computed: {
    routes() {
      return this.$router.options.routes;
    },
    includedComponents() {
      console.log(1111);
      return 'about';
    },
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteUpdate(to, from, next) {
    // this.tabs[to.name] = to;
    next();
  },
  mounted() {
    // this.tabs = {
    //   [this.$route.name]: this.$route,
    // };
  },
  methods: {
    onTabRemove(e) {
      Vue.delete(this.tabs, e);
      this.$refs.keepAlive.removeCacheByKey(e);
    },
    onTabClick(tab) {
      this.$router.push({ name: tab.name });
    },
    includesSym(list, o, sym) {
      for (let i = 0; i < list.length; i += 1) {
        if (list[i][sym] === o[sym]) {
          return true;
        }
      }
      return false;
    },
    updateKey(key) {
      this.tabs[key] = this.$route;
    },
  },
};
</script>

<style lang="stylus">
.el-container
  height 100%
body, html
  margin 0
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
