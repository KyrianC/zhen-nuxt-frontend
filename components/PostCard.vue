<template>
  <NuxtLink
    :to="`/posts/correction-detail/${post.slug}`"
    id="post-card"
    :class="`border-difficulty${post.difficulty}-400`"
    class="flex flex-col w-full md:w-2/5 my-3 md:m-3 p-4 bg-secondaryBackground border-r-4 block"
  >
    <div class="flex flex-wrap items-center">
      <h2 class="text-xl font-bold mr-2">{{ post.title }}</h2>
      <span
        v-if="showNewCorrectionsNotification"
        class="text-xs self-start text-red-400"
      >New correction !</span>
    </div>
    <p v-if="post.language == 'en'">🇬🇧</p>
    <p v-else-if="post.language == 'zh'">🇨🇳</p>
    <p :class="`text-difficulty${post.difficulty}-400`">{{ post.get_difficulty_display }}</p>
    <p>{{ post.description }}</p>
    <div class="mt-auto">
      <span
        class="inline-block text-lg my-2 px-1 border-primary border-b-2 hover:border-primary hover:bg-primary hover:text-gray-300 transition-all"
      >See post</span>
      <NuxtLink
        v-if="$auth.loggeIn && $auth.user.pk != post.text.author.pk"
        :to="`/posts/correct/${post.slug}`"
        class="inline-block text-lg my-2 px-1 border-primary border-b-2 hover:border-primary hover:bg-primary hover:text-gray-300 transition-all"
      >Correct</NuxtLink>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    post: Object,
  },
  computed: {
    showNewCorrectionsNotification() {
      return (
        this.$auth.loggedIn &&
        this.$auth.user.pk == this.post.author.pk &&
        this.post.has_new_corrections
      );
    },
  },
};
</script>
