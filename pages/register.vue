<template>
  <form @submit.prevent="userRegister">
    <div>
      <label>Username</label>
      <input type="text" v-model="register.username" />
    </div>
    <div>
      <label>email</label>
      <input type="email" v-model="register.email" />
    </div>
    <div>
      <label>Password</label>
      <input type="password" v-model="register.password1" />
    </div>
    <div>
      <label>Confirm Password</label>
      <input type="password" v-model="register.password2" />
    </div>
    <div>
      <button type="submit">Submit</button>
    </div>
  </form>
</template>

<script>
export default {
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
