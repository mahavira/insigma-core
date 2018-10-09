import { mapMutations, mapActions } from 'vuex';
import {
  ADD as ADD_TAB,
  REMOVE as REMOVE_TAB,
} from '../store/modules/tabs/types';
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
  return null;
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
  abstract: false,
  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number],
  },
  data() {
    return {
    };
  },
  created() {
    this.cache = Object.create(null);
    this.keys = [];
  },
  mounted() {
    this.$watch('include', (val) => {
      pruneCache(this, name => matches(val, name));
    });
    this.$watch('exclude', (val) => {
      pruneCache(this, name => !matches(val, name));
    });
    // 当移除标签item时，也清除对应的cache
    this.$store.subscribe((mutation) => {
      if (mutation.type === REMOVE_TAB) {
        pruneCacheEntry(this.cache, mutation.payload, this.keys);
      }
    });
  },
  destroyed() {
    Object.keys(this.cache).forEach(key => pruneCacheEntry(this.cache, key, this.keys));
  },
  methods: {
    ...mapMutations([REMOVE_TAB]),
    ...mapActions([ADD_TAB]),
  },
  render() {
    console.log('keep-alive');
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
      ) return vnode;
      const { cache, keys } = this;
      let key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? (`::${componentOptions.tag}`) : '')
        : vnode.key;
      key = `_${key}`;

      const { replaceData } = this.$router;
      if (replaceData && replaceData.replace) {
        const oldKey = replaceData.key;
        if (oldKey !== key) {
          pruneCacheEntry(this.cache, oldKey, this.keys);
          this.$nextTick(() => this[REMOVE_TAB](oldKey));
        }
        delete this.$router.replaceData;
      }
      this.$nextTick(() => this[ADD_TAB]({
        key,
        item: {
          path: this.$route.path,
          fullPath: this.$route.fullPath,
          name: this.$route.name,
        },
      }));
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
