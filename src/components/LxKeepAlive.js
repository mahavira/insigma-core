import { matches, remove, isDef } from '../shared/util';

function isAsyncPlaceholder(node) {
  return node.isComment && node.asyncFactory;
}

function getFirstComponentChild(children) {
  if (Array.isArray(children)) {
    for (let i = 0; i < children.length; i += 1) {
      const c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c;
      }
    }
  }
  return false;
}

function getComponentName(opts) {
  return opts && (opts.Ctor.options.name || opts.tag);
}

function pruneCacheEntry(cache, key, keys, current) {
  const cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}
function pruneCache({ cache, keys, _vnode }, filter) {
  Object.keys(cache).forEach((key) => {
    const cachedNode = cache[key];
    if (cachedNode) {
      const name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  });
}

const patternTypes = [String, RegExp, Array];

export default {
  name: 'LxKeepAlive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number],
    updateComponentsKey: Function,
  },

  data() {
    return {
      cache: Object.create(null),
    };
  },

  created() {
    // this.cache = Object.create(null);
    this.keys = [];
    // this.$data = { cache: Object.create(null) };
  },
  mounted() {
    this.$watch('include', (val) => {
      pruneCache(this, name => matches(val, name));
    });
    this.$watch('exclude', (val) => {
      pruneCache(this, name => !matches(val, name));
    });
  },
  destroyed() {
    Object.keys(this.cache).forEach(key => pruneCacheEntry(this.cache, key, this.keys));
  },
  methods: {
    removeCacheByKey(key) {
      pruneCacheEntry(this.cache[key]);
      this.cache[key] = null;
    },
  },
  render() {
    const slot = this.$slots.default;
    const vnode = getFirstComponentChild(slot);
    const componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      const name = getComponentName(componentOptions);
      const { include, exclude } = this;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode;
      }

      const { cache, keys } = this;
      const key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? (`::${componentOptions.tag}`) : '')
        : vnode.key;
      console.log(vnode, vnode.tag);
      if (this.updateComponentsKey) this.updateComponentsKey(key);
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max, 0)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0]);
  },
};
