<template>
  <div
    class="px-3 bg-secondaryBackground flex flex-col items-center min-h-screen"
  >
    <h1
      class="my-4 text-2xl font-bold text-center border-b-2 capitalize"
      :class="`border-${post.difficulty}-400`"
    >
      {{ post.text.title }}
    </h1>
    <p class="italic">Written by {{ post.text.author.username }}</p>
    <p class="text-justify mx-2 my-4 text-lg max-w-prose whitespace-pre-line">
      {{ post.text.original_content }}
    </p>
    <button
      v-if="$auth.loggedIn && $auth.user.pk == post.text.author.id"
      @click.prevent="deleteModal = true"
    >
      Delete Post
    </button>
    <NuxtLink
      v-if="
        $auth.loggedIn
          ? $auth.user.language !== post.language &&
            $auth.user.pk !== post.text.author.id
          : true
      "
      :to="`/posts/correct/${post.slug}`"
      >Correct Post</NuxtLink
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      deleteModal: false
    };
  },
  async asyncData({ route, $axios }) {
    const post = await $axios.$get(`${route.fullPath}/`);
    console.log(post);
    return { post };
  },
  methods: {
    deleteModal() {},
    async deletePost() {
      try {
        let response = await this.$axios.$delete(`${this.$route.fullPath}/`);
        // Redirect here
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style></style>
