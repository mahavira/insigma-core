<template>
  <div class="post-item">
    <h1>{{$route.params.id}}</h1>
    <input type="text" v-model="input">
    <div ref="echarts" style="width:100%;height:1200px"></div>
  </div>
</template>
<script>
export default {
  name: 'PostItem',
  data() {
    return {
      timer: null,
      input: '',
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
          data: [820, 932, 901, 934, 1290, 1330, 1320].map(() => Math.floor(Math.random() * 1000)),
          type: 'line',
        },
      ],
    });
  },
};
</script>
