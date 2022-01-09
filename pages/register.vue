<template>
  <div class="min-h-screen flex flex-col justify-center items-center">
    <form @submit.prevent="userRegister" class="bg-primary rounded-md p-8">
      <h1 class="text-3xl font-bold mb-4 text-center">Register</h1>
      <FormInput
        label="Username"
        type="text"
        v-model="register.username"
        :error="error.username"
        :required="true"
      />
      <FormInput
        label="Email"
        type="email"
        v-model="register.email"
        :error="error.email"
        :required="true"
      />
      <FormInput
        label="Password"
        type="password"
        v-model="register.password1"
        :error="error.password1"
        :required="true"
      />
      <FormInput
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
      <div class="flex justify-evenly">
        <Button class="mt-4" name="Register" scheme="primary" btnType="submit" />
        <Button linkTo="/" class="mt-4" name="Cancel" scheme="secondary" />
      </div>
    </form>
    <small class="mt-3">
      Already have an account?
      <NuxtLink class="text-secondary underline" to="/login">Login Now</NuxtLink>
    </small>
  </div>
</template>

<script>
import Button from "~/components/common/Button.vue";
import FormInput from "~/components/form/FormInput.vue";
export default {
  components: {
    FormInput,
    Button,
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
