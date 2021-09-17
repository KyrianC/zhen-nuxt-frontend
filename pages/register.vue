<template>
  <form @submit.prevent="userRegister">
    <formInput
      label="Username"
      type="text"
      v-model="register.username"
      :error="error.username"
    />
    <formInput
      label="Email"
      type="email"
      v-model="register.email"
      :error="error.email"
    />
    <formInput
      label="Password"
      type="password"
      v-model="register.password1"
      :error="error.password1"
    />
    <formInput
      label="Confirm Password"
      type="password"
      v-model="register.password2"
      :error="error.password2"
    />
    <p
      class="text-red-500"
      :key="index"
      v-for="(message, index) in error.non_field_errors"
    >
      {{ message }}
    </p>
    <button type="submit">Submit</button>
  </form>
</template>

<script>
import formInput from "~/components/form/formInput.vue";
export default {
  component: {
    formInput
  },
  middleware: "auth",
  auth: "guest",
  data() {
    return {
      register: {
        username: "",
        email: "",
        password1: "",
        password2: ""
      },
      response: "",
      error: ""
    };
  },
  methods: {
    async userRegister() {
      try {
        this.response = await this.$axios.$post("/auth/registration/", {
          ...this.register
        });
        return this.response;
      } catch (err) {
        console.dir(err);
        this.error = err.response.data;
        return this.error;
      }
    }
  }
};
</script>
