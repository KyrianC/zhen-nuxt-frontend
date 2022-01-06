<template>
  <div class="min-h-screen bg-primary">
    <section id="user-info" class="p-4 flex flex-row justify-center bg-primary sticky top-0 z-20">
      <div class="flex flex-col items-center mx-4">
        <div id="user-img" class="w-20 h-20 rounded-full bg-gray-400"></div>
        <p class="text-lg font-bold my-2">{{ $auth.user.username }}</p>
      </div>
      <div class="flex flex-col justify-center mx-4">
        <p>
          <span class="font-bold">Learning:</span>
          <span></span>
          {{ $auth.user.get_learning_language_display }}
        </p>
        <p>
          <span class="font-bold">Level:</span>
          <span :class="`text-difficulty${$auth.user.level}-400`">{{ $auth.user.get_level_display }}</span>
        </p>
        <div class="mt-4">
          <button
            class="mx-2 transition duration-500 p-1 text-black bg-secondary border-2 border-secondary hover:bg-secondaryBackground hover:text-white"
          >
            <NuxtLink to="/users/edit">Edit</NuxtLink>
          </button>
          <button
            class="mx-2 text-white transition duration-500 p-1 text-black bg-secondaryBackground border-2 border-secondaryBackground hover:bg-primary hover:border-primary"
          >Delete</button>
        </div>
      </div>
    </section>
    <section id="user-texts" class="flex flex-col md:flex-row">
      <div class="md:w-1/6 relative flex justify-center z-10 w-full">
        <ul
          id="user-texts-nav"
          class="bg-primary flex justify-center flex-row justify-evenly w-full md:w-auto md:flex-col fixed py-2"
        >
          <li
            class="flex items-center my-2 cursor-pointer"
            v-for="texts, name in result"
            @click="show = name"
            :key="name"
            :class="show == name && 'font-bold'"
          >
            <span :class="show == name && 'bg-white'" class="w-4 h-1 inline-block mr-2"></span>
            {{ name }}
          </li>
        </ul>
      </div>
      <div class="w-full mt-12 md:mt-0">
        <PostList v-for="texts, name in result" :key="name" v-show="name == show" :posts="texts" />
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: "Posts",
    };
  },
  async asyncData({ $axios }) {
    const posts = await $axios.$get(`users/testuser/posts/`);
    const corrections = await $axios.$get(`users/testuser/corrections/`);
    console.log(posts);
    return { result: { Posts: posts, Corrections: corrections } };
  },
};
</script>

<style>
</style>
