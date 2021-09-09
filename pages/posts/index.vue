<template>
  <div>
    <!-- filter -->
    <div class="flex justify-center">
      <div
        class="w-full mx-6 md:mx-0 md:w-4/5 flex items-center"
        key="filter-btn"
      >
        <button>
          <img
            class="w-6 md:ml-3 mt-3"
            src="/filter.svg"
            @click="$store.commit('setShowFilters')"
          />
        </button>
      </div>
    </div>
    <!-- need to wrap in transistion-group for posts to transition when they get pushed down when filter appear -->
    <transition-group name="filter" mode="in-out">
      <div
        class="flex justify-center mt-3 md:mx-3"
        key="filter"
        v-if="$store.state.showFilters"
      >
        <PostFilter
          class="border-2 border-gray-400 bg-secondaryBackground p-4 w-full mx-6 flex flex-col flex-wrap md:w-4/5 relative"
        />
      </div>
      <transition-group
        key="posts"
        name="flip-list"
        tag="div"
        class="relative text-gray-300 flex flex-wrap mx-6 justify-center"
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
        >
          {{ posts.next ? "Load More" : "No More Posts..." }}
        </button>
      </transition-group>
    </transition-group>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
import PostFilter from "@/components/form/PostFilter";
export default {
  components: {
    PostCard,
    PostFilter
  },
  async asyncData({ route, $axios, store }) {
    const filters = { ...store.state.filters };
    // TODO can't use metod/computed in asyncData to format url, so need to find a way to make it cleaner and reusable
    const url = `${route.fullPath}/?ordering=${
      filters.ordering
    }&difficulty=${filters.difficulty.join(
      ","
    )}&language=${filters.language.join(
      ","
    )}&corrected=${filters.corrected.join(",")}`;
    const posts = await $axios.$get(url);
    return { posts };
  },
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
    }
  },
  computed: {
    formatedUrl() {
      let url = `${this.$route.fullPath}/?`;
      const filters = { ...this.$store.state.filters };
      for (const [key, value] of Object.entries(filters)) {
        let format = value;
        if (Array.isArray(value)) {
          format = format.join(",");
        }
        url += `&${key}=${format}`;
      }
      return url;
    }
  },
  watch: {
    formatedUrl: {
      handler() {
        this.getNewPosts();
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
