<template>
<transition name="slide-down">
  <section class="contact-view" v-if="visible">
    <transition-stagger
      :before-enter-styles="{translateY: -10, opacity: 0}"
      :enter-styles="{translateY: 0, opacity: 1}"
      :leave-styles="{}"
      :delay="100"
      tag="div"
      class="service-list"
      :options="{}"
      :enter-at-once="false"
      :leave-at-once="true">
        <div class="service-item" v-for="(item,index) in services"
          :key="index"
          :style="{backgroundImage:'url('+item.bg+')'}">
          <h4>{{item.name}}</h4>
        </div>
    </transition-stagger>
  </section>
</transition>
</template>
<script>
import TransitionStagger from '@/components/Stagger.vue';

const services = [
  {
    name: '售票系统',
    bg: '/examples/1.png',
  },
  {
    name: '检票系统',
    bg: '/examples/2.png',
  },
  {
    name: '用户管理系统',
    bg: '/examples/3.png',
  },
  {
    name: '售票系统',
    bg: '/examples/1.png',
  },
  {
    name: '售票系统',
    bg: '/examples/1.png',
  },
  {
    name: '售票系统',
    bg: '/examples/2.png',
  },
];

export default {
  name: 'service-list',
  components: {
    TransitionStagger,
  },
  data() {
    return {
      services: [],
    };
  },
  computed: {
    visible() {
      return this.$store.state.visibleServiceList;
    },
  },
  mounted() {
    this.$watch('visible', (visible) => {
      if (visible) this.services = services;
      else this.services = [];
    });
  },
};
</script>
<style lang="stylus" scoped>
.service-list
  display flex
  position absolute
  left 0
  top 0
  right 0
  bottom 0
  justify-content center
  align-items center
  align-content center
  flex-wrap wrap
.service-item
  display flex
  width 230px
  height 130px
  background #FFF url('/examples/1.png') no-repeat
  background-size cover
  margin 10px
  justify-content center
  align-items flex-end
  color #FFF
  border-radius 4px
  box-shadow 0 0 1px rgba(56, 56, 56, 0.25)
  cursor pointer
  transition box-shadow 0.218s ease
  &:hover
    box-shadow 0 7px 21px rgba(56, 56, 56, 0.15)
  h4
    background rgba(0, 0, 0, 0.2)
    padding 2px
    line-height 1
</style>
