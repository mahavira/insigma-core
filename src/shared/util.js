const toStr = Object.prototype.toString;
export function isUndef(v) {
  return v === undefined || v === null;
}

export function isDef(v) {
  return v !== undefined && v !== null;
}

export function isTrue(v) {
  return v === true;
}

export function isFalse(v) {
  return v === false;
}
export function isRegExp(v) {
  return toStr.call(v) === '[object RegExp]';
}
/**
 * 移除数组项
 */
export function remove(arr, item) {
  if (arr.length) {
    const index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1);
    }
  }
  return arr;
}
/**
 */
export function matches(pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1;
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1;
  } else if (isRegExp(pattern)) {
    return pattern.test(name);
  }
  return false;
}
