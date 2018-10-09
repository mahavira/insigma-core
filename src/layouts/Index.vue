<template>
<section class="lx-container lx-vertical lx-full">
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
</section>
</template>
<script>
import LxHeader from './Header.vue';
import LxMenu from './Menu.vue';
import LxTabs from './Tabs.vue';
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
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style lang="stylus">

</style>
