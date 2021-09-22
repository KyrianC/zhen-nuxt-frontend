<template>
  <form method="POST" @submit.prevent="completeUserProfile">
    <formInput
      type="select"
      v-model="userDetail.learning_language"
      label="Language to learn"
      name="language"
      :options="languages"
    />
    <formInput
      type="select"
      v-model="userDetail.level"
      name="difficulty"
      label="Your level of proficiency in the language above"
      :options="difficulties"
    />
    <button type="submit">submit</button>
  </form>
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
      userDetail: {
        username: this.$auth.user.username,
        email: this.$auth.user.email,
        learning_language: "",
        level: ""
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
    async completeUserProfile() {
      try {
        await this.$axios.$put("/auth/user/", {
          ...this.userDetail
        });
        this.$router.push({ name: "index" });
          this.$toast.success("Your profile is now complete!");
      } catch (err) {
        console.log(err);
        this.$toast.error("An error occured, please try again");
      }
    }
  },
  beforeCreate() {
    if (
      this.$auth.user.level != "unset" &&
      this.$auth.learning_language != "unset"
    ) {
      this.$router.push({ name: "user" });
    }
  }
};
</script>

<style></style>
