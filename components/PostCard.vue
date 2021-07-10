<template>
  <div class="w-2/5 border-2 border-black rounded m-2 p-2">
    <h2 class="text-xl font-bold">{{ post.text.title }}</h2>
    <p v-if="post.language == 'en'">🇬🇧</p>
    <p v-else-if="post.language == 'zh'">🇨🇳</p>
    <p :class="`text-${post.difficulty}-400`">{{ post.difficulty }}</p>
    <p>{{ post.text.original_content }}</p>
    <nuxt-link
      :to="`${$route.fullPath}/${post.slug}`"
      class="inline-block text-lg my-2 px-1 border-gray-400 border-b-2 rounded hover:border-2 hover:border-black hover:bg-black hover:text-white transition-all"
      >See post</nuxt-link
    >
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  }
};
</script>

<style></style>
