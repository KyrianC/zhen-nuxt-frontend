<template>
  <div>
    <div v-if="$auth.loggedIn">{{ $auth.user.username }}</div>
    <form @submit.prevent="userLogin">
      <div>
        <label>Username</label>
        <input type="text" v-model="login.username" />
      </div>
      <div>
        <label>Password</label>
        <input type="text" v-model="login.password" />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
    <button v-if="$auth.loggedIn" @click="userLogout">logout</button>
  </div>
</template>

<script>
export default {
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
