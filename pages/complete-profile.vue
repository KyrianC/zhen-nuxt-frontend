<template>
  <form
    class="flex flex-col justify-center items-center"
    method="POST"
    @submit.prevent="completeUserProfile"
  >
    <formInput
      type="select"
      v-model="userDetail.learning_language"
      label="Language to learn"
      name="language"
      :options="languages"
      :required="true"
      :error="error.learning_language"
    />
    <formInput
      type="select"
      v-model="userDetail.level"
      name="difficulty"
      label="Your level of proficiency in the language above"
      :options="difficulties"
      :required="true"
      :error="error.level"
    />
    <p
      class="text-red-500"
      v-for="(message, index) in error.non_field_errors"
      :key="index"
    >{{ message }}</p>
    <button type="submit">submit</button>
  </form>
</template>

<script>
import formInput from "~/components/form/formInput.vue";
import difficulties from "~/static/difficulties";
import languages from "~/static/languages";
export default {
  component: {
    formInput,
  },
  middleware: "auth",
  data() {
    return {
      userDetail: {
        username: this.$auth.user.username,
        email: this.$auth.user.email,
        learning_language: "en",
        level: "elementary",
      },
      error: "",
      languages,
      difficulties,
    };
  },
  methods: {
    async completeUserProfile() {
      try {
        var response = await this.$axios.$put("/auth/user/", {
          ...this.userDetail,
        });
        if (
          response.level !== "unset" &&
          response.learning_language !== "unset"
        ) {
          console.log(response);
          // BUG this.$router.push & .replace doesn't work
          // maybe because redirect from extern page or because auth module redirect
          this.$router.go();
          this.$toast.success("Your profile is now complete!");
        }
      } catch (err) {
        console.log(err);
        this.error = err.response.data;
        this.$toast.error("An error occured, please try again");
      }
    },
  },
  beforeCreate() {
    if (
      this.$auth.user.level != "unset" &&
      this.$auth.learning_language != "unset"
    ) {
      this.$router.push({ name: "user" });
    }
  },
};
</script>

<style></style>
