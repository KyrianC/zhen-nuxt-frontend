<template>
  <div class="min-h-screen flex flex-col justify-center items-center">
    <form @submit.prevent="userLogin" class="bg-primary rounded-md p-8">
      <h1 class="text-3xl text-center font-bold m-4">Login</h1>
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
      <div class="flex justify-evenly">
        <Button class="mt-4" name="Login" scheme="primary" btnType="submit" />
        <Button linkTo="/" class="mt-4" name="Cancel" scheme="secondary" />
      </div>
    </form>
    <div class="mt-6">
      <small>
        No account yet?
        <NuxtLink class="text-secondary underline" to="/register">Register Now</NuxtLink>
      </small>
    </div>
  </div>
</template>

<script>
import Button from "~/components/common/Button.vue";
import FormInput from "~/components/form/FormInput.vue";
export default {
  components: {
    Button,
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
        await this.$auth.loginWith("local", {
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
