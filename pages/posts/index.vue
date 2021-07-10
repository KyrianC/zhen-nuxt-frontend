<template>
  <div class="flex flex-wrap">
    <PostCard v-for="post in posts" :post="post" :key="post.id" />
  </div>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
export default {
  ssr: false,
  data() {
    return {
      posts: [],
      originalPosts: []
    };
  },
  async asyncData({ route, $axios }) {
    const posts = await $axios.$get(`${route.fullPath}/`);
    console.log(route.path, route.fullPath);
    return { posts };
  }
};
</script>

<style></style>
