/**
 * -------------------------------
 * log输出及向服务端发送
 * -------------------------------
 */
class Log {
  config = {
    url: '/api/log',
    delay: 30000,
    enable: false,
  }
  timer = null
  logs = []
  /**
   * 提交至服务
   */
  fetch() {
    if (!this.logs.length || !this.config.enable) {
      this.timing();
      return;
    }
    $.ajax({
      type: 'POST',
      url: this.config.url,
      contentType: 'application/json; charset=UTF-8',
      data: JSON.stringify(this.logs),
      success: () => {
        this.logs = [];
        this.timing();
      },
      error: () => {
        this.timing();
      },
    });
  }
  setConfig(config) {
    this.config = Object.assign({}, this.config, config);
    this.timing();
  }
  /**
   * 定时保存
   */
  timing() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.fetch(), this.config.delay);
  }
}
export const $log = new Log();
export default function () {
  if (arguments.length === 0) {
    return;
  }
  Function.prototype.apply.call(console.log, console, arguments);
  for (let i = 0, size = arguments.length; i < size; i += 1) {
    $log.logs.push(new Date().getTime() + ':' + arguments[i])
  }
}
