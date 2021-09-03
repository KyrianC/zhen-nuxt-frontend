<template>
  <NuxtLink
    :to="`${$route.fullPath}/${post.slug}`"
    id="post-card"
    :class="`border-${post.difficulty}-400`"
    class="w-full md:w-2/5 mx-6 my-3 md:m-3 p-4 bg-secondaryBackground border-r-4 block"
  >
    <h2 class="text-xl font-bold">{{ post.text.title }}</h2>
    <p v-if="post.language == 'en'">🇬🇧</p>
    <p v-else-if="post.language == 'zh'">🇨🇳</p>
    <p :class="`text-${post.difficulty}-400`">
      {{ post.difficulty }}
    </p>
    <p>{{ post.description }}</p>
    <div>
      <span
        class="inline-block text-lg my-2 px-1 border-primary border-b-2 hover:border-2 hover:border-primary hover:bg-primary hover:text-gray-300 transition-all"
        >See post</span
      >
      <NuxtLink
        v-if="$auth.loggeIn && $auth.user.pk != post.text.author.id"
        :to="`${$route.fullPath}/correct/${post.slug}`"
        class="inline-block text-lg my-2 px-1 border-primary border-b-2 hover:border-2 hover:border-primary hover:bg-primary hover:text-gray-300 transition-all"
        >Correct</NuxtLink
      >
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    post: Object
  }
};
</script>
