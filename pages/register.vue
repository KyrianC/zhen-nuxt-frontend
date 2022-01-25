<template>
  <div class="min-h-screen flex flex-col justify-center items-center">
    <form @submit.prevent="userRegister" class="bg-primary rounded-md p-8">
      <h1 class="text-3xl font-bold mb-4 text-center">{{ $t('register') }}</h1>
      <FormInput
        :label="$t('username')"
        type="text"
        v-model="register.username"
        :error="error.username"
        :required="true"
      />
      <FormInput
        :label="$t('email')"
        type="email"
        v-model="register.email"
        :error="error.email"
        :required="true"
      />
      <FormInput
        :label="$t('password')"
        type="password"
        v-model="register.password1"
        :error="error.password1"
        :required="true"
      />
      <FormInput
        :label="$t('password2')"
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
        <Button class="mt-4" :name="$t('register')" scheme="primary" btnType="submit" />
        <Button :linkTo="localePath('/')" class="mt-4" :name="$t('cancel')" scheme="secondary" />
      </div>
    </form>
    <small class="mt-3">
      {{ $t('have_account') }}
      <NuxtLink class="text-secondary underline" :to="localePath('/login')">{{ $t('login') }}</NuxtLink>
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
        this.$router.push(localePath("/after-register"));
        this.$toast.success(this.$t("success"));
      } catch (err) {
        console.dir(err);
        this.$toast.error(this.$t("error"));
        this.error = err.response.data;
      }
    },
  },
};
</script>

<i18n lang="yaml">
  en:
    register: "Register"
    username: "Username"
    email: "Email"
    password: "Password"
    password2: "Confirm Password"
    cancel: "Cancel"
    have_account: "Already have an account?"
    login: "Login Now"
    error: "An error occurred, please try again"
    success: "Just one more step..."
  zh:
    register: "注册"
    username: "用户名"
    email: "电子邮件"
    password: "密码"
    password2: "确认密码"
    cancel: "取消"
    have_account: "已经有帐号？"
    login: "直接登录"
    error: "发生错误，请重试"
    success: "还差一步…"
</i18n>
