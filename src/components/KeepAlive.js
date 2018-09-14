function isDef(val) {
  return val !== undefined && val !== null;
}

function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i += 1) {
      const c = children[i];
      if (isDef(c) && isDef(c.componentOptions)) {
        return c;
      }
    }
  }
  return null;
}

function pruneCacheEntry(vnode) {
  if (vnode) {
    vnode.componentInstance.$destroy();
  }
}

export default {
  name: 'pk-keep-alive',

  props: {
    include: [],
    exclude: [],
    updateComponentsKey: Function,
  },

  created() {
    // vue的keep-alive存储对象
    this.cache = Object.create(null);
  },
  // 调用keep-alive组件销毁钩子，组件销毁的时候同时清除缓存
  destroyed() {
    // for (const key in this.cache) {
    //   pruneCacheEntry(this.cache[key]);
    // }
    Object.values(this.cache).forEach(v => pruneCacheEntry(v));
  },

  // watch: {
  //   include(val) {
  //     pruneCache(this.cache, this._vnode, name => matches(val, name));
  //   },
  //   exclude(val) {
  //     pruneCache(this.cache, this._vnode, name => !matches(val, name));
  //   },
  // },

  render() {
    const vnode = getFirstComponentChild(this.$slots.default);
    const componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      const key =
        vnode.key == null
          ? componentOptions.Ctor.cid +
            (componentOptions.tag ? `::${componentOptions.tag}` : '')
          : vnode.key;
      // 添加获取key的外部hook
      if (this.updateComponentsKey) this.updateComponentsKey(key);
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    console.log(vnode);
    return vnode;
  },
  methods: {
    // 通过cache的key删除对应的缓存
    removeCacheByKey(key) {
      pruneCacheEntry(this.cache[key]);
      this.cache[key] = null;
    },
  },
};
