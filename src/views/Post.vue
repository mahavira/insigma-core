<template>
  <div class="post">
    <h1>POST</h1>
    <input type="text">
    <router-link v-for="post in posts" replace
      :key="post.id" :to="'/dashboard/post/'+post.id">{{post.title + ' | '}}</router-link>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'Post',
  data() {
    return {
      posts: [{
        id: 1,
        title: 'xxxxxxxx',
      }, {
        id: 2,
        title: 'aaaaa',
      }, {
        id: 3,
        title: 'hhhhhhhh',
      }],
    };
  },
  mounted() {
    // console.log('post mounted');
  },
  activated() {
  },
  deactivated() {
  },
};
</script>
