<template>
  <div class="text-gray-300 flex flex-wrap justify-center">
    <PostCard v-for="post in posts" :post="post" :key="post.id" />
  </div>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
export default {
  ssr: false,
  components: {
    PostCard
  },
  data() {
    return {
      posts: []
    };
  },
  async asyncData({ route, $axios }) {
    const posts = await $axios.$get(`${route.fullPath}/`);
    console.log(posts);
    return { posts };
  }
};
</script>

<style></style>
