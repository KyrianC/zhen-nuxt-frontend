<template>
  <div id="edit">
    <NuxtLink to="users/profile">< Cancel</NuxtLink>
    <p class="color-red-400" v-if="error.non_field_error">{{ error.non_field_error }}</p>
    <form>
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
      <button @click="handleSubmit" type="submit">Confirm Edit</button>
    </form>
  </div>
</template>

<script>
import languages from "~/static/languages";
import difficulties from "~/static/difficulties";
export default {
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
    async handleSubmit(e) {
      e.preventDefault();
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
