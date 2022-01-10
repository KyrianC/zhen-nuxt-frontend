<template>
  <NuxtLink
    :to="`/posts/${post.slug}`"
    id="post-card"
    :class="`border-difficulty${post.difficulty}-400`"
    class="w-full md:w-2/5 my-3 md:m-3 p-4 bg-secondaryBackground border-r-4 block"
  >
    <h2 class="text-xl font-bold">{{ post.title }}</h2>
    <p v-if="post.language == 'en'">🇬🇧</p>
    <p v-else-if="post.language == 'zh'">🇨🇳</p>
    <p :class="`text-difficulty${post.difficulty}-400`">{{ post.get_difficulty_display }}</p>
    <p>{{ post.description }}</p>
    <div>
      <span
        class="inline-block text-lg my-2 px-1 border-primary border-b-2 hover:border-primary hover:bg-primary hover:text-gray-300 transition-all"
      >See post</span>
      <NuxtLink
        v-if="$auth.loggeIn && $auth.user.pk != post.text.author.pk"
        :to="`/posts/correct/${post.slug}`"
        class="inline-block text-lg my-2 px-1 border-primary border-b-2 hover:border-2 hover:border-primary hover:bg-primary hover:text-gray-300 transition-all"
      >Correct</NuxtLink>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    post: Object,
  },
};
</script>
