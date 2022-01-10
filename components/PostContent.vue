<template>
  <section id="original-post" class="w-full px-3 bg-secondaryBackground flex flex-col items-center">
    <h1
      class="my-4 text-2xl font-bold text-center border-b-2 capitalize"
      :class="`border-difficulty${post.difficulty}-400`"
    >{{ post.title }}</h1>
    <p class="italic">Written by {{ post.author.username }}</p>
    <p
      v-if="diff && diff.length"
      class="text-justify mx-2 my-4 text-lg text-gray-300 md:text-xl leading-8 max-w-prose whitespace-pre-line"
    >
      <span
        v-for="(word, index) in diff"
        :key="`${word[0]}-${index}`"
        :class="
              word[0] == 1
                ? 'text-green-400 underline'
                : word[0] == -1 && 'text-red-400 line-through'
            "
      >{{ word[1] }}</span>
    </p>
    <p
      v-else
      class="text-justify mx-2 my-4 text-lg text-gray-300 md:text-xl leading-8 max-w-prose whitespace-pre-line"
    >{{ post.content }}</p>
  </section>
</template>

<script>
export default {
  props: {
    post: Object,
    diff: Array,
  },
};
</script>

<style>
</style>
