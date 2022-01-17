<template>
  <div class="min-h-screen bg-primary">
    <FilterIcon />
    <transition-group tag="div" name="filter" mode="in-out">
      <PostFilter key="filter" v-show="$store.state.showFilters" />
      <PostList :posts="posts" key="posts" />
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
  beforeMount() {
    console.log(window.innerWidth);
    // show Filter on bigger screen
    // 768px correspond to tailwindCss 'md' breakpoint
    console.log(this.$store.state.showFilters);
    if (!this.$store.state.showFilters && window.innerWidth >= 768) {
      this.$store.commit("setShowFilters", true);
    }
  },
};
</script>

