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
        <transition name="slide-fade">
        <lx-keep-alive :updateComponentsKey="updateKey" ref="keepAlive">
          <router-view/>
        </lx-keep-alive>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</el-container>
</template>
<script>
import Vue from 'vue';
import MenuItem from './MenuItem.vue';
import LxKeepAlive from '../components/LxKeepAlive';

export default {
  name: 'home',
  components: { MenuItem, LxKeepAlive },
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
  },
  beforeRouteEnter(to, from, next) {
    next();
  },
  beforeRouteUpdate(to, from, next) {
    this.tabs[to.path] = to;
    console.log(to);
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
      const { $vnode } = tab;
      console.log(tab, $vnode);
      const componentOptions = $vnode && $vnode.componentOptions;
      const key = $vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? (`::${componentOptions.tag}`) : '')
        : $vnode.key;
      console.log(key);
      this.$router.push({ name: tab.name });
    },
    updateKey() {
      this.$set(this.tabs, this.$route.path, this.$route);
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

  /* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
