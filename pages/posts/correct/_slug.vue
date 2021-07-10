<template>
  <div>
    <h1>Correct Post</h1>
    <form method="POST">
      <label for="title">
        Title:
        <input v-model="correction.title" type="text" name="title" />
      </label>
      <label for="content">
        Text:
        <textarea
          v-model="correction.original_content"
          name="content"
          id="content"
        ></textarea>
      </label>
      <button @click.prevent="postCorrect">submit</button>
    </form>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  async asyncData({ params, $axios }) {
    const post = await $axios.$get(`/posts/${params.slug}/`);
    return { post };
  },
  data() {
    return {
      correction: {
        title: "",
        original_content: ""
      }
    };
  },
  methods: {
    async postCorrect() {
      try {
        const res = await this.$axios.$post(
          `/posts/correct/${this.post.slug}/`,
          {
            ...this.correction
          }
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  },
  created() {
    console.log(this.post);
    if (this.$auth.user.pk == this.post.text.author.pk) {
      this.$router.push({ name: "posts" });
    }
  }
};
</script>

<style></style>
