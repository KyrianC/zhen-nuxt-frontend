<template>
  <div class="flex flex-col items-center md:justify-center">
    <h1>Your Profile</h1>
    <h2>Your Texts</h2>
    <section>
      <div class="flex relative">
        <div class="dynamicBorder absolute h-1 bg-white" ref="dynamicBorder"></div>
        <button
          class="m-2 py-2 text-lg font-medium"
          @click="changeList('posts', $event.target)"
        >Posts</button>
        <button
          class="m-2 py-2 p-w text-lg font-medium"
          @click="changeList('corrections', $event.target)"
        >Corrections</button>
      </div>
      <!-- TODO add colors relative to post difficulty & pagination feature -->
      <div class="lists relative flex justify-center overflow-hidden h-full">
        <div
          class="transform transitions duration-300"
          :class="showList !== 'posts' && 'translate-x-full absolute opacity-0'"
        >
          <p
            v-for="text in original_texts"
            :key="text.id"
            class="bg-primary py-2 px-6 my-2 border border-primary hover:border-white"
          >
            <NuxtLink :to="formatPostUrl(text.post)">{{ text.title }}</NuxtLink>
          </p>
        </div>
        <div
          class="transform transitions duration-300"
          :class="showList !== 'corrections' && '-translate-x-full absolute opacity-0'"
        >
          <p
            v-for="text in corrections"
            :key="text.id"
            class="bg-primary py-2 px-6 my-2 border border-primary hover:border-white"
          >
            <NuxtLink :to="formatPostUrl(text.correction.post)">{{ text.title }}</NuxtLink>
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  async asyncData({ $axios, $auth }) {
    const userTexts = await $axios.$get(`users/${$auth.user.pk}/`);
    console.log(userTexts);
    return { userTexts };
  },
  data() {
    return {
      showList: "posts",
    };
  },
  computed: {
    corrections() {
      return this.userTexts.text.filter((x) => x.is_correction);
    },
    translations() {
      return this.userTexts.text.filter((x) => x.is_translation);
    },
    original_texts() {
      return this.userTexts.text.filter((x) => x.post);
    },
  },
  methods: {
    formatPostUrl(fullUrl) {
      // "http://localhost:8000/api/posts/post-slug/" -> "/posts/post-slug"
      return fullUrl.split(this.$axios.defaults.baseURL)[1].slice(0, -1);
    },
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
