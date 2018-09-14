<template>
  <div class="post">
    <h1>POST</h1>
    <router-link v-for="post in posts"
      :key="post.id" :to="'/dashboard/post/'+post.id">{{post.title + ' | '}}</router-link>
    <router-view/>
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
  activated() {
    console.log('ctivated');
  },
  deactivated() {
    console.log('eactivated');
  },
};
</script>
