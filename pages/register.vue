<template>
  <div class="min-h-screen flex flex-col justify-center items-center">
    <h1 class="text-3xl font-bold m-4">Register</h1>
    <form @submit.prevent="userRegister">
      <formInput
        label="Username"
        type="text"
        v-model="register.username"
        :error="error.username"
        :required="true"
      />
      <formInput
        label="Email"
        type="email"
        v-model="register.email"
        :error="error.email"
        :required="true"
      />
      <formInput
        label="Password"
        type="password"
        v-model="register.password1"
        :error="error.password1"
        :required="true"
      />
      <formInput
        label="Confirm Password"
        type="password"
        v-model="register.password2"
        :error="error.password2"
        :required="true"
      />
      <p
        class="text-red-500"
        :key="index"
        v-for="(message, index) in error.non_field_errors"
      >{{ message }}</p>
      <button
        class="p-2 my-4 border-2 border-secondary hover:bg-secondary hover:text-secondaryBackground transition duration-500"
        type="submit"
      >Submit</button>
    </form>
    <small>
      Already have an account?
      <NuxtLink to="/login">Login Now</NuxtLink>
    </small>
  </div>
</template>

<script>
import formInput from "~/components/form/formInput.vue";
export default {
  component: {
    formInput,
  },
  middleware: "auth",
  auth: "guest",
  data() {
    return {
      register: {
        username: "",
        email: "",
        password1: "",
        password2: "",
      },
      response: "",
      error: "",
    };
  },
  methods: {
    async userRegister() {
      try {
        this.response = await this.$axios.$post("/auth/registration/", {
          ...this.register,
        });
        this.$router.push({ name: "afterRegister" });
        this.$toast.show("Just one more step...");
      } catch (err) {
        console.dir(err);
        this.$toast.error("An error occured, please try again");
        this.error = err.response.data;
      }
    },
  },
};
</script>
