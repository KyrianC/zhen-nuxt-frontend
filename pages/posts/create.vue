<template>
  <div>
    <h1>Create Post</h1>
    <form @submit.prevemt="postCreate" method="POST">
      <label>
        Language:
        <select v-model="post.language" name="language">
          <option value="en">English</option>
          <option value="zh">Chinese</option>
        </select>
      </label>
      <label>
        Difficulty:
        <select v-model="post.difficulty" name="difficulty">
          <option value="elementary">Elementary</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
          <option value="master">Master</option>
        </select>
      </label>
      <label for="title">
        Title:
        <input v-model="post.text.title" type="text" name="title" value="" />
      </label>
      <label for="content">
        Text:
        <textarea
          v-model="post.text.original_content"
          name="content"
          id="content"
        ></textarea>
      </label>
      <button>submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        language: "",
        difficulty: "",
        text: {
          title: "",
          original_content: ""
        }
      }
    };
  },
  methods: {
    async postCreate() {
      console.log(this.$route);
      try {
        let response = await this.$axios.$post(this.$route.fullPath, {
          ...this.post
        });
        this.$router.push({ name: "posts-index" });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
