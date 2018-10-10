<template>
<section class="lx-container lx-vertical lx-full"
  @click="()=>visibleServiceList=!visibleServiceList">
  <lx-header/>
  <section class="lx-container">
    <aside class="lx-aside">
      <lx-menu/>
    </aside>
    <section class="lx-container lx-vertical">
      <div class="lx-tabs">
        <lx-tabs/>
      </div>
      <main class="lx-main">
        <lx-keep-alive>
          <router-view :key="$route.fullPath"/>
        </lx-keep-alive>
      </main>
    </section>
  </section>
  <lx-service-list/>
</section>
</template>
<script>
import { SET_ATTR } from '@/store/';
import LxHeader from './Header.vue';
import LxMenu from './Menu.vue';
import LxServiceList from './ServiceList.vue';
import LxTabs from './Tabs.vue';
import LxKeepAlive from './KeepAlive';

export default {
  name: 'home',
  components: {
    LxHeader,
    LxMenu,
    LxTabs,
    LxKeepAlive,
    LxServiceList,
  },
  data() {
    return {
      visibleServiceList: false,
    };
  },
  created() {
  },
  mounted() {
    window.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        if (this.$store.state.visibleServiceList) {
          this.$store.commit(SET_ATTR, {
            visibleServiceList: !this.$store.state.visibleServiceList,
          });
        }
      }
    });
  },
  methods: {
  },
};
</script>

<style lang="stylus">

</style>
