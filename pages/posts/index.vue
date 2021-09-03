<template>
  <div>
    <transition-group
      name="flip-list"
      tag="div"
      class="text-gray-300 flex flex-wrap justify-center"
      mode="out-in"
    >
      <PostCard v-for="post in posts.results" :post="post" :key="post.id" />
      <button
        key="btn"
        class="w-full md:w-2/5 mx-6 my-3 md:m-3 p-4 bg-secondaryBackground border-r-4 block"
        type="button"
        @click="getNewPosts"
        :disabled="!posts.next"
        :class="!posts.next && 'cursor-not-allowed'"
      >
        {{ posts.next ? "Load More" : "No More Posts..." }}
      </button>
    </transition-group>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
export default {
  components: {
    PostCard
  },
  async asyncData({ route, $axios }) {
    const posts = await $axios.$get(`${route.fullPath}/`);
    return { posts };
  },
  methods: {
    async getNewPosts() {
      if (this.posts.next != null) {
        const newPosts = await this.$axios.$get(this.posts.next);
        this.posts.next = newPosts.next;
        this.posts.results.push(...newPosts.results);
        console.log(this.posts);
      }
    }
  }
};
</script>

<style>
.flip-list-enter-active,
.flip-list-leave-active {
  transition: all 0.5s;
}
.flip-list-enter,
.flip-list-leave-to {
  opacity: 0;
  transform: translateY(1rem);
  z-index: 0;
  /* position: absolute; */
}
.flip-list-move {
  transition: transform 0.5s;
}
</style>
