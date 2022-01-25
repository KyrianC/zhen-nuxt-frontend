<template>
  <div>
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
        @click="getNewPosts(loadMore = true)"
        :disabled="!posts.next"
        :class="!posts.next ? 'cursor-not-allowed' : 'font-bold text-lg'"
      >{{ !posts.next ? posts.count == 0 ? "No posts" : "No More Posts...": "Load More" }}</button>
    </transition-group>
  </div>
</template>

<script>
import PostCard from "@/components/PostCard.vue";
export default {
  components: {
    PostCard,
  },
  props: ["posts", "getNewPosts"],
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
