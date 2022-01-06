<template>
  <div class="min-h-screen flex flex-col justify-center items-center">
    <h1 class="text-3xl font-bold m-4">Login</h1>
    <form @submit.prevent="userLogin">
      <FormInput
        label="Username"
        type="text"
        v-model="login.username"
        :error="error.username"
        :required="true"
      />
      <FormInput
        label="Password"
        type="password"
        v-model="login.password"
        :error="error.password"
        :required="true"
      />
      <p
        class="text-red-500"
        v-for="(message, index) in error.non_field_errors"
        :key="index"
      >{{ message }}</p>
      <button
        class="p-2 my-4 border-2 border-secondary hover:bg-secondary hover:text-secondaryBackground transition duration-500"
        type="submit"
      >Submit</button>
    </form>
    <small>
      No account yet?
      <NuxtLink to="/register">Register Now</NuxtLink>
    </small>
    <button v-if="$auth.loggedIn" @click="userLogout">logout</button>
  </div>
</template>

<script>
import FormInput from "~/components/form/FormInput.vue";
export default {
  component: {
    FormInput,
  },
  data() {
    return {
      login: {
        username: "",
        password: "",
      },
      error: "",
    };
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.login,
        });
        if (
          this.$auth.user.level == "unset" ||
          this.$auth.learning_language == "unset"
        ) {
          this.$router.push({ name: "complete-profile" });
        }
        this.$toast.success("Successfully authenticated");
      } catch (err) {
        console.log(err);
        this.error = err.response.data;
        this.$toast.error("Error while authenticating");
      }
    },
    async userLogout() {
      await this.$auth.logout();
      this.$router.push({ name: "index" });
    },
  },
};
</script>
