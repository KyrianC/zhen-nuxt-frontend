<template>
  <div>
    <h1>{{ post.text.title }}</h1>
    <h2>{{ post.text.author.username }}</h2>
    <p>{{ post.text.original_content }}</p>
    <button
      v-if="$auth.user && $auth.user.pk == post.text.author.pk"
      @click.prevent="deletePost"
    >
      Delete Post
    </button>
    <NuxtLink
      v-if="
        $auth.user &&
          $auth.user.language !== post.language &&
          $auth.user.pk !== post.text.author.pk
      "
      :to="`/posts/correct/${post.slug}`"
      >Correct Post</NuxtLink
    >
  </div>
</template>

<script>
export default {
  async asyncData({ route, $axios }) {
    const post = await $axios.$get(`${route.fullPath}/`);
    console.log(post);
    return { post };
  },
  methods: {
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
