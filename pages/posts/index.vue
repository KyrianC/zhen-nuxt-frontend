<template>
  <div>
    <!-- TODO created filterInput components -->
    <select id="" name="" multiple v-model="filters.difficulty">
      <option value="">All</option>
      <option value="elementary">Elementary</option>
      <option value="beginner">Beginner</option>
      <option value="intermediate">Intermediate</option>
      <option value="advanced">Advanced</option>
      <option value="master">Master</option>
    </select>
    <select id="" name="" multiple v-model="filters.language">
      <option value="">All</option>
      <option value="en">English</option>
      <option value="zh">Chinese</option>
    </select>
    <select id="" name="" v-model="filters.ordering">
      <option value="-created">Newest</option>
      <option value="created">Oldest</option>
    </select>
    <select id="" name="" v-model="filters.corrected">
      <option value="unknown">all</option>
      <option value="true">corrected only</option>
      <option value="false">not corrected</option>
    </select>
    <transition-group
      name="flip-list"
      tag="div"
      class="text-gray-300 flex flex-wrap justify-center"
    >
      <PostCard v-for="post in posts.results" :post="post" :key="post.id" />
      <button
        key="btn"
        class="w-full md:w-2/5 mx-6 my-3 md:m-3 p-4 bg-secondaryBackground border-r-4 block"
        type="button"
        @click="getNewPosts((loadMore = true))"
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
  ssr: false,
  components: {
    PostCard
  },
  data() {
    return {
      filters: {
        difficulty: [],
        language: [],
        ordering: "-created",
        corrected: "unknown"
      }
    };
  },
  async asyncData({ route, $axios }) {
    const posts = await $axios.$get(`${route.fullPath}/?ordering=-created`);
    return { posts };
  },
  methods: {
    async getNewPosts(loadMore = false) {
      if (this.posts.next != null && loadMore == true) {
        const newPosts = await this.$axios.$get(this.posts.next);
        this.posts.next = newPosts.next;
        this.posts.results.push(...newPosts.results);
      } else {
        const filter = this.filters;
        const newPosts = await this.$axios.$get(
          `${this.$route.fullPath}/?ordering=${
            filter.ordering
          }&language=${filter.language.join(
            ","
          )}&difficulty=${filter.difficulty.join(",")}&corrected=${
            filter.corrected
          }`
        );
        this.posts = newPosts;
      }
    }
  },
  watch: {
    filters: {
      handler() {
        this.getNewPosts();
      },
      deep: true
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
}
.flip-list-move {
  transition: transform 0.5s;
}

.flip-list-leave-active {
  position: absolute;
}
</style>
