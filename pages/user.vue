<template>
  <div class="bg-primary">
    <h1>Your Profile ({{ $auth.user.username }})</h1>
    <h2>Your Texts</h2>
    <section class="w-full">
      <div class="w-full flex relative">
        <div class="dynamicBorder absolute h-1 bg-white" ref="dynamicBorder"></div>
        <button
          class="m-2 py-2 text-lg font-medium"
          @click="changeList('posts', $event.target)"
        >My Posts</button>
        <button
          class="m-2 py-2 p-w text-lg font-medium"
          @click="changeList('corrections', $event.target)"
        >My Corrections</button>
      </div>
      <!-- TODO add colors relative to post difficulty & pagination feature -->
      <div class="relative overflow-hidden h-full">
        <div
          class="transform transitions duration-300"
          :class="showList !== 'posts' && 'translate-x-1/4 absolute opacity-0'"
        >
          <PostList :posts="posts" />
        </div>
        <div
          class="transform transitions duration-300"
          :class="showList !== 'corrections' && '-translate-x-1/4 absolute opacity-0'"
        >
          <PostList :posts="corrections" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  async asyncData({ $axios, $auth }) {
    const posts = await $axios.$get(`users/${$auth.user.username}/posts/`);
    const corrections = await $axios.$get(
      `users/${$auth.user.username}/corrections/`
    );
    console.log(posts.results, corrections.results);
    return { posts, corrections };
  },
  data() {
    return {
      showList: "posts",
      userTexts: {},
    };
  },
  methods: {
    changeList(toShow, target) {
      this.showList = toShow;
      const present = this.$refs.dynamicBorder;
      const targetWidth = target.clientWidth;
      const targetX = target.offsetLeft;
      const presentX = present.offsetLeft;
      const targetHeight = target.clientHeight;
      present.style.width = `${targetWidth}px`;
      present.style.transform = `translateX(${targetX - presentX}px)`;
      present.style.top = `${targetHeight}px`;
    },
  },
  mounted() {
    // initialize position of the dynamic border-bottom
    this.changeList("posts", this.$refs.dynamicBorder.nextElementSibling);
  },
};
</script>

<style scoped>
.dynamicBorder {
  transition: all 0.3s;
}
</style>
