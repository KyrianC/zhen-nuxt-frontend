<template>
  <div class="flex flex-col items-center">
    <h1>Create Post</h1>
    <form
      @submit.prevent="postCreate"
      method="POST"
      class="flex flex-col items-left"
    >
      <formInput
        type="select"
        label="Difficulty"
        v-model="post.difficulty"
        name="difficulty"
        :options="difficulties"
        :selected="post.difficulty"
      />
      <!-- <formInput
           type="select"
           label="Language"
           v-model="post.language"
           name="language"
           :options="languages"
           :disabled="true"
           /> -->
      <formInput
        label="Title"
        v-model="post.text.title"
        type="text"
        name="title"
        value=""
      />
      <formInput
        label="Description"
        v-model="post.description"
        type="text"
        name="description"
        value=""
      />
      <formInput
        label="Content"
        type="textarea"
        v-model="post.text.original_content"
        name="content"
        id="content"
      />
      <button>submit</button>
    </form>
  </div>
</template>

<script>
import formInput from "~/components/form/formInput.vue";
export default {
  component: {
    formInput
  },
  middleware: "auth",
  data() {
    return {
      post: {
        description: "",
        language: this.$auth.user.learning_language,
        difficulty: this.$auth.user.level,
        text: {
          title: "",
          original_content: ""
        }
      },
      languages: [
        {
          value: "en",
          display: "English"
        },
        {
          value: "zh",
          display: "Chinese"
        }
      ],
      difficulties: [
        {
          value: "elementary",
          display: "Elementary"
        },
        {
          value: "beginner",
          display: "Beginner"
        },
        {
          value: "intermediate",
          display: "Intermediate"
        },
        {
          value: "advanced",
          display: "Advanced"
        },
        {
          value: "master",
          display: "Master"
        }
      ]
    };
  },
  methods: {
    async postCreate() {
      console.log(this.$route);
      try {
        let response = await this.$axios.$post(this.$route.fullPath + "/", {
          ...this.post
        });
        this.$router.push("/posts");
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
