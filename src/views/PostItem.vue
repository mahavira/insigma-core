<template>
  <div class="post-item">
    <h1>{{$route.params.id}}</h1>
    <input type="text">
  </div>
</template>
<script>
export default {
  data() {
    return {
      timer: null,
      id: 0,
    };
  },
  activated() {
  },
  destroyed() {
  },
  mounted() {
  },
};
</script>
