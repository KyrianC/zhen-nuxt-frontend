<template>
  <div id="edit" class="min-h-screen flex flex-col items-center justify-center">
    <form
      @submit.prevent="handleSubmit"
      class="flex bg-primary p-12 rounded-md flex-col justify-center"
    >
      <h1 class="text-3xl text-center font-bold mb-4">Edit Profile</h1>
      <p class="color-red-400" v-if="error.non_field_error">{{ error.non_field_error }}</p>
      <FormInput
        type="text"
        name="username"
        label="Username"
        v-model="user.username"
        :defaultValue="user.username"
        :required="true"
        :error="error.username"
      />
      <FormInput
        type="email"
        name="email"
        label="Email"
        v-model="user.email"
        :defaultValue="user.email"
        :required="true"
        :error="error.email"
      />
      <FormInput
        type="select"
        name="language"
        label="Language Learned"
        v-model="user.language"
        :defaultValue="user.learning_language"
        :options="languages"
        :required="true"
        :error="error.learning_language"
      />
      <FormInput
        type="select"
        name="level"
        label="Level in above language"
        v-model="user.level"
        :defaultValue="user.level"
        :options="difficulties"
        :required="true"
        :error="error.level"
      />
      <div class="flex justify-evenly">
        <Button class="mt-4" name="Confirm Edit" scheme="primary" btnType="submit" />
        <Button linkTo="/users/profile" class="mt-4" name="Cancel" scheme="secondary" />
      </div>
    </form>
  </div>
</template>

<script>
import Button from "~/components/common/Button.vue";
import languages from "~/static/languages";
import difficulties from "~/static/difficulties";
export default {
  components: {
    Button,
  },
  data() {
    return {
      user: {
        username: this.$auth.user.username,
        email: this.$auth.user.email,
        learning_language: this.$auth.user.learning_language,
        level: this.$auth.user.level,
      },
      error: "",
      languages,
      difficulties,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await this.$axios.$put("/auth/user/", {
          ...this.user,
        });
        this.$router.push("/users/profile");
        this.$toast.success("Successfully Edited User Infos");
        this.$auth.fetchUser();
      } catch (err) {
        console.dir(err);
        this.$toast.error("An error occured, please try again");
        this.error = err.response.data;
      }
    },
  },
};
</script>

<style>
</style>
