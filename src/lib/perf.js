/**
 * -------------------------------
 * 用户体验收集
 * -------------------------------
 */
const data = {};
function setLog(data) {
  $log(JSON.stringify(data));
}
export default {
  start(name, desc) {
    if (!name) return;
    data[name] = {};
    data[name].start = new Date().getTime();
    if (desc) data[name].desc = desc;
  },
  end(name) {
    if (!name || !data[name]) return;
    data[name].end = new Date().getTime();
    data[name].duration = data[name].end - data[name].start;
    setLog(data[name]);
  },
};
