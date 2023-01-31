<template lang="">
  <router-link :to="'post/' + post.id" class="post">
    <div class="post--up">
      <span class="title">{{ post.title }}</span>
    </div>
    <div class="post--down">
      <span class="user">by {{ post.userId }}</span>
      <span class="date">{{ new Date(post.createdAt).toLocaleDateString() }}</span>
    </div>
  </router-link>
</template>
<script>
export default {
  name: "single-post",
  props: ['post']

}
</script>
<style>
.post {
  padding: 0.3rem 0.5rem;
  text-decoration: none;
  color: auto;
  display: block;
}
.post--up .title {
  font-size: 1.2em;
  color: black;
}
.post--down {
  font-size: 0.8em;
  color: #828282
}
.post--down .user::after {
  content: ' ';
}
</style>