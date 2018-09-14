<template>
  <div class="about">
    <h1>This is an about page</h1>
    <input type="text" v-model="msg">
    <div ref="echarts" style="width:100%;height:1200px"></div>
  </div>
</template>
<script>
export default {
  name: 'About',
  data() {
    return {
      msg: '1',
    };
  },
  mounted() {
    echarts.init(this.$refs.echarts).setOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
        },
      ],
    });
  },
  activated() {
  },
  deactivated() {
  },
};
</script>
