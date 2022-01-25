<template>
  <div class="flex flex-col items-center justify-center md:py-4">
    <form
      @submit.prevent="postCreate"
      method="POST"
      class="flex flex-col items-left justify-center bg-primary p-8 md:rounded-md"
    >
      <h1 class="text-2xl text-center font-bold">Create a Post</h1>
      <FormInput
        type="select"
        label="Difficulty"
        v-model="post.difficulty"
        name="difficulty"
        :options="difficulties"
        :selected="post.difficulty"
        :error="error.difficulty"
      />
      <FormInput
        type="text"
        label="Title"
        :placeholder="`Title (in ${$auth.user.learning_language == 'zh' ? 'English' : 'Chinese'})`"
        v-model="post.title"
        :required="true"
        name="title"
        :error="error.title"
      />
      <FormInput
        label="Description"
        name="description"
        :placeholder="`Description (in ${$auth.user.learning_language == 'zh' ? 'English' : 'Chinese'})`"
        type="text"
        v-model="post.description"
        :required="true"
        :error="error.description"
      />
      <FormInput
        label="Content"
        type="textarea"
        :placeholder="`Text (in ${$auth.user.learning_language == 'zh' ? 'Chinese' : 'English'})`"
        v-model="post.content"
        name="content"
        :required="true"
        :error="error.content"
      />
      <Button name="Submit" scheme="primary" btnType="submit" />
    </form>
  </div>
</template>

<script>
import FormInput from "@/components/form/FormInput.vue";
import Button from "~/components/common/Button.vue";
import languages from "@/static/languages";
import difficulties from "@/static/difficulties";
export default {
  components: {
    FormInput,
    Button,
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
        this.$router.push(`/posts/${this.post.slug}`);
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
