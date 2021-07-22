<template>
  <div>
    <div v-if="$auth.loggedIn">{{ $auth.user.username }}</div>
    <form @submit.prevent="userLogin">
      <formInput label="Username" type="text" v-model="login.username" />
      <formInput label="Password" type="password" v-model="login.password" />
      <button type="submit">Submit</button>
    </form>
    <button v-if="$auth.loggedIn" @click="userLogout">logout</button>
  </div>
</template>

<script>
import formInput from "~/components/form/formInput.vue";
export default {
  component: {
    formInput
  },
  data() {
    return {
      login: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async userLogin() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.login
        });
        if (
          this.$auth.user.level == "unset" ||
          this.$auth.learning_language == "unset"
        ) {
          this.$router.push({ name: "complete-profile" });
        } else {
          this.$router.push({ name: "index" });
        }
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
    async userLogout() {
      await this.$auth.logout();
      this.$router.push({ name: "index" });
    }
  }
};
</script>
