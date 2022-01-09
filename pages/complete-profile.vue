<template>
  <div class="min-h-screen flex justify-center items-center">
    <form class="bg-primary p-12 rounded-md" method="POST" @submit.prevent="completeUserProfile">
      <h1 class="text-3xl text-center font-bold mb-4">Complete your Profile</h1>
      <FormInput
        type="select"
        v-model="userDetail.learning_language"
        label="Language to learn"
        name="language"
        :options="languages"
        :required="true"
        :error="error.learning_language"
      />
      <FormInput
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
      <Button name="Submit" btnType="submit" scheme="primary" />
    </form>
  </div>
</template>

<script>
import FormInput from "~/components/form/FormInput.vue";
import Button from "~/components/common/Button.vue";
import difficulties from "~/static/difficulties";
import languages from "~/static/languages";
export default {
  components: {
    FormInput,
    Button,
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
