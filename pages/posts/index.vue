<template>
  <div class="min-h-screen bg-primary">
    <FilterIcon />
    <transition-group tag="div" name="filter" mode="in-out">
      <PostFilter key="filter" v-show="$store.state.showFilters" />
      <PostList :posts="posts" key="posts" :getNewPosts="getNewPosts" />
    </transition-group>
  </div>
</template>

<script>
import PostFilter from "@/components/form/PostFilter";
import PostList from "@/components/PostList";
export default {
  components: {
    PostFilter,
    PostList,
  },
  async asyncData({ $axios, store }) {
    const filters = { ...store.state.filters };
    // can't use computed property formatedUrl in asyncData
    const url = `posts/?ordering=${
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
  beforeMount() {
    // show Filter on bigger screen
    // 768px correspond to tailwindCss 'md' breakpoint
    if (!this.$store.state.showFilters && window.innerWidth >= 768) {
      this.$store.commit("setShowFilters", true);
    }
  },
};
</script>

