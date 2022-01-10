<template>
  <div class="bg-primary">
    <transition-group
      key="posts"
      name="flip-list"
      tag="div"
      class="text-gray-300 flex flex-wrap mx-6 justify-center"
    >
      <!-- post list -->
      <PostCard v-for="post in posts.results" :post="post" :key="post.id" />
      <button
        key="btn"
        class="w-full md:w-2/5 my-3 md:m-3 p-4 bg-secondaryBackground border-r-4 block"
        type="button"
        @click="getNewPosts((loadMore = true))"
        :disabled="!posts.next"
        :class="!posts.next && 'cursor-not-allowed'"
      >{{ posts.next ? "Load More" : "No More Posts..." }}</button>
    </transition-group>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
export default {
  components: {
    PostCard,
  },
  props: ["posts"],
  methods: {
    async getNewPosts(loadMore = false) {
      if (this.posts.next != null && loadMore == true) {
        const newPosts = await this.$axios.$get(this.posts.next);
        this.posts.next = newPosts.next;
        this.posts.results.push(...newPosts.results);
      } else {
        const newPosts = await this.$axios.$get(this.formatedUrl);
        this.posts = newPosts;
      }
      // this.$store.commit("setPosts", this.posts);
    },
  },
  computed: {
    formatedUrl() {
      let url = `posts/?`;
      const filters = { ...this.$store.state.filters };
      for (const [key, value] of Object.entries(filters)) {
        let format = value;
        if (Array.isArray(value)) {
          format = format.join(",");
        }
        url += `&${key}=${format}`;
      }
      return url;
    },
  },
  watch: {
    formatedUrl: {
      handler() {
        this.getNewPosts();
      },
    },
  },
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
}
.flip-list-move {
  transition: transform 0.5s;
}

.flip-list-leave-active {
  position: absolute;
}

.filter-enter-active,
.filter-leave-active {
  transition: transform 0.5s, opacity 0.3s;
}
.filter-enter,
.filter-leave-to {
  opacity: 0;
  transform: translateY(-2rem);
}
.filter-leave-active {
  display: none;
}
.filter-move {
  transition: transform 0.5s;
}
</style>
