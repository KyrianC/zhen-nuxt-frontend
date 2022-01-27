<template>
  <div class="min-h-screen flex flex-col justify-center items-center">
    <form @submit.prevent="userLogin" class="bg-primary rounded-md p-8">
      <h1 class="text-3xl text-center font-bold mb-4">{{ $t('login') }}</h1>
      <FormInput
        :label="$t('username')"
        type="text"
        v-model="login.username"
        :error="error.username"
        :required="true"
      />
      <FormInput
        :label="$t('password')"
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
        <Button class="mt-4" :name="$t('login')" scheme="primary" btnType="submit" />
        <Button :linkTo="'/'" class="mt-4" :name="$t('cancel')" scheme="secondary" />
      </div>
    </form>
    <div class="mt-6">
      <small>
        {{ $t('no_account') }}
        <NuxtLink
          class="text-secondary underline"
          :to="localePath('/register')"
        >{{ $t('register') }}</NuxtLink>
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
          this.$router.push(this.localePath("/complete-profile"));
        }
        this.$toast.success(this.$t("success"));
      } catch (err) {
        console.log(err);
        this.error = err.response.data;
        this.$toast.error(this.$t("error"));
      }
    },
    async userLogout() {
      await this.$auth.logout();
    },
  },
};
</script>

<i18n lang="yaml">
  en:
    login: "Login"
    cancel: "Cancel"
    no_account: "No account yet?"
    register: "Register Now"
    username: "Username"
    password: "Password"
    success: "Successfully authenticated"
    error: "Error while authenticating"
  zh:
    no_account: "没有帐号？"
    register: "直接注册"
    login: "登录"
    cancel: "取消"
    username: "用户名"
    password: "密码"
    success: "成功登录"
    error: "登录错误"
</i18n>
