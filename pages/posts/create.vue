<template>
  <div class="flex flex-col items-center justify-center py-4">
    <h1 class="text-2xl font-bold">Create a Post</h1>
    <form
      @submit.prevent="postCreate"
      method="POST"
      class="flex flex-col items-left justify-center"
    >
      <formInput
        type="select"
        label="Difficulty"
        v-model="post.difficulty"
        name="difficulty"
        :options="difficulties"
        :selected="post.difficulty"
        :error="error.difficulty"
      />
      <formInput
        type="text"
        label="Title"
        v-model="post.title"
        :required="true"
        name="title"
        :error="error.title"
      />
      <formInput
        label="Description"
        name="description"
        type="text"
        v-model="post.description"
        :required="true"
        :error="error.description"
      />
      <formInput
        label="Content"
        type="textarea"
        v-model="post.content"
        name="content"
        :required="true"
        :error="error.content"
      />
      <button>submit</button>
    </form>
  </div>
</template>

<script>
import formInput from "@/components/form/formInput.vue";
import languages from "@/static/languages";
import difficulties from "@/static/difficulties";
export default {
  component: {
    formInput,
  },
  middleware: "auth",
  data() {
    return {
      post: {
        title: "",
        slug: "",
        description: "",
        content: "",
        language: this.$auth.user.learning_language,
        difficulty: this.$auth.user.level,
      },
      languages,
      difficulties,
      error: "",
    };
  },
  methods: {
    async postCreate() {
      console.log(this.$route);
      try {
        let response = await this.$axios.$post(this.$route.fullPath + "/", {
          ...this.post,
        });
        this.$router.push("/posts");
        this.$toast.success(`Successfully created "${this.post.title}"`);
        console.log(response);
      } catch (err) {
        this.error = err.response.data;
        this.$toast.error("An error occured, please try again");
        console.log(err);
      }
    },
  },
};
</script>
