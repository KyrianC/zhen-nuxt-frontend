<template>
  <form @submit.prevent="userRegister">
    <formInput label="Username" type="text" v-model="register.username" />
    <formInput label="Email" type="email" v-model="register.email" />
    <formInput label="Password" type="password" v-model="register.password1" />
    <formInput
      label="Confirm Password"
      type="password"
      v-model="register.password2"
    />
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
      }
    };
  },
  methods: {
    async userRegister() {
      try {
        let response = await this.$axios.$post("/auth/registration/", {
          ...this.register
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
