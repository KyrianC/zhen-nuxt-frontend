<template>
  <form method="POST" @submit.prevent="completeUserProfile">
    <label>
      Language you are currently learning:
      <select v-model="userDetail.learning_language" name="language">
        <option value="en">English</option>
        <option value="zh">Chinese</option>
      </select>
    </label>
    <label>
      Your level of proficiency at this language:
      <select v-model="userDetail.level" name="difficulty">
        <option value="elementary">Elementary</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
        <option value="master">Master</option>
      </select>
    </label>
    <button type="submit">submit</button>
  </form>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {
      userDetail: {
        username: this.$auth.user.username,
        email: this.$auth.user.email,
        learning_language: "",
        level: ""
      }
    };
  },
  methods: {
    async completeUserProfile() {
      try {
        await this.$axios.$put("/auth/user/", {
          ...this.userDetail
        });
        this.$router.push({ name: "index" });
      } catch (err) {
        console.log(err);
      }
    }
  },
  beforeCreate() {
    if (
      this.$auth.user.level != "unset" &&
      this.$auth.learning_language != "unset"
    ) {
      this.$router.push({ name: "index" });
    }
  }
};
</script>

<style></style>
