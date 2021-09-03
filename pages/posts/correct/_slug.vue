<template>
  <div
    class="px-3 bg-secondaryBackground flex flex-col items-center min-h-screen"
  >
    <h1
      class="my-4 text-2xl font-bold text-center border-b-2 capitalize"
      :class="`border-${post.difficulty}-400`"
    >
      Correct <span class="italic">"{{ post.text.title }}"</span>
    </h1>
    <form class="flex-grow" method="POST">
      <FormInput
        label="Title"
        name="title"
        type="text"
        v-model="correction.title"
        :defaultValue="post.text.title"
      />
      <FormInput
        label="Text"
        name="content"
        type="textarea"
        v-model="correction.original_content"
        :defaultValue="post.text.original_content"
      />
      <button @click.prevent="postCorrect">submit</button>
    </form>
  </div>
</template>

<script>
import formInput from "~/components/form/formInput";
export default {
  component: {
    FormInput: formInput
  },
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
