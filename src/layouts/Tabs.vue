<template>
  <div :class="$style.tabs" ref="tabList">
    <div :class="$style.list">
      <div
        v-for="(tab, key) in items"
        :class="[$style.item, key===active?$style.active:'']"
        @click="onClick(tab.fullPath)"
        :key="key">
        <div :class="$style['item-inner']">
          <span>{{tab.title}}</span>
          <a @click.stop="removeTab(key)" v-show="!isLastOne"><i class="el-icon-plus"></i></a>
        </div>
      </div>
    </div>
    <div :class="$style.handle">
    <el-popover
      placement="bottom"
      transition="el-zoom-in-bottom"
      trigger="hover">
      <el-button-group>
        <el-button>
          <i class="fa fa-times-circle-o"></i>
        </el-button>
        <el-button>
          <i class="fa fa-th"></i>
        </el-button>
        <el-button>
          <i class="fa fa-window-maximize"></i>
        </el-button>
      </el-button-group>
      <i class="el-icon-news" slot="reference"></i>
    </el-popover>
    </div>
  </div>
</template>
<script>
// import * as Rx from 'rxjs';
// import * as operators from 'rxjs/operators';
import { REMOVE } from '../store/modules/tabs/types';

function getSiblingKey(keys, currentKey) {
  const index = keys.indexOf(currentKey);
  return index < keys.length - 1 ? keys[index + 1] : keys[index - 1];
}
export default {
  computed: {
    isLastOne() {
      return Object.keys(this.items).length === 1;
    },
    items() {
      return this.$store.state.tabs.items;
    },
    active() {
      return this.$store.state.tabs.key;
    },
  },
  mounted() {
    // // const subject = new Rx.BehaviorSubject(0);
    // const { tabList } = this.$refs;
    // this.observable = Rx.fromEvent(window, 'resize')
    //   .pipe(
    //     operators.debounceTime(200),
    //     operators.map(() => tabList.clientWidth - 50),
    //   )
    //   .subscribe((width) => {
    //     console.log(width);
    //   });
  },
  destroyed() {
    // this.observable.unsubscribe();
  },
  methods: {
    onClick(e) {
      this.$router.push(e);
    },
    removeTab(key) {
      const keys = Object.keys(this.items);
      if (keys.length <= 1) return;
      this.$store.commit(REMOVE, key);
      if (key === this.active) {
        const nextKey = getSiblingKey(keys, key);
        this.$router.push(this.items[nextKey].fullPath);
      }
    },
  },
};
</script>

<style lang="stylus" module>
bgColor = #E2E5E8
activeColor = #FFF
hoverColor = #F4F5F6
dividerColor = #A4B2C7
.tabs
  display flex
  background bgColor
  padding-top 5px
  justify-content space-between
  color #555
  user-select none
.handle
  padding 6px 12px 0
  text-align right
.list
  display flex
  flex 1
  height 35px
  position relative
  padding-right 8px
  overflow hidden
.item
  flex 1
  max-width 240px
  position relative
  &:before
    content ''
    position absolute
    bottom 0
    height 50%
    left -8px
    width 100%
    padding 0 8px
    transition all 0.3s
  &:after
    content ''
    position absolute
    top 0
    right -16px
    width 16px
    height 100%
    background bgColor
    border-radius 8px
  &.active
    .item-inner
      background activeColor
      box-shadow -1px 0 0 activeColor
      // margin-left -1px
      &:after
        visibility hidden
      a
        background-color activeColor
        box-shadow -10px 0 10px activeColor
        &:hover
          background-color bgColor
    &:before
      background activeColor
  &:hover:not(.active)
    .item-inner
      background hoverColor
      box-shadow -1px 0 0 hoverColor
      // margin-left -1px
      &:after
        visibility hidden
      a
        background-color hoverColor
        box-shadow -10px 0 10px hoverColor
        &:hover
          background-color bgColor
    &:before
      display none
      background hoverColor
.item-inner
  padding 0 15px
  height 35px
  line-height 35px
  overflow hidden
  border-radius 8px
  font-size 12px
  position relative
  z-index 1
  background bgColor
  transition all 0.3s
  &:after
    content ''
    position absolute
    top 20%
    right 0
    height 60%
    width 1px
    background dividerColor
  a
    width 20px
    height 20px
    line-height 20px
    text-align center
    position absolute
    right 10px
    top 8px
    background bgColor
    box-shadow -10px 0 10px bgColor
    transition all 0.3s
    border-radius 50%
    &:hover
      background-color bgColor
  i
    transform rotateZ(45deg)
</style>
