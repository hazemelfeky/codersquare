<template lang="">
  <div class="post">
    <div class="post--up">
      <span class="title">{{ post.title }}</span>
    </div>
    <div class="post--down">
      <span class="user">by {{ post.userId }}</span>
      <span class="date">{{ new Date(post.createdAt).toLocaleDateString() }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "single-post",
  props: ['post']
  // data() {
  //   return {
  //     post: {
  //       title: 'title',
  //       userName: 'userName',
  //       postedAt: new Date()
  //       // likes: 5
  //     }
  //   }
  // }
}
</script>
<style>
.post {
  padding: 0.3rem 0.5rem;
}
.post--up .title {
  font-size: 1.2em;
  color: black;
}
.post--down {
  font-size: 0.8em;
}
.post--down .user::after {
  content: ' ';
}
</style>