<template>
  <div id="edit" class="min-h-screen flex flex-col items-center justify-center">
    <form
      @submit.prevent="handleSubmit"
      class="flex bg-primary p-12 rounded-md flex-col justify-center"
    >
      <h1 class="text-3xl text-center font-bold mb-4">{{ $t('header') }}</h1>
      <p class="color-red-400" v-if="error.non_field_error">{{ error.non_field_error }}</p>
      <FormInput
        type="text"
        name="username"
        :label="$t('username')"
        v-model="user.username"
        :defaultValue="user.username"
        :required="true"
        :error="error.username"
      />
      <FormInput
        type="email"
        name="email"
        :label="$t('email')"
        v-model="user.email"
        :defaultValue="user.email"
        :required="true"
        :error="error.email"
      />
      <FormInput
        type="select"
        name="language"
        :label="$t('language')"
        v-model="user.language"
        :defaultValue="user.learning_language"
        :options="languages"
        :required="true"
        :error="error.learning_language"
      />
      <FormInput
        type="select"
        name="level"
        :label="$t('level')"
        v-model="user.level"
        :defaultValue="user.level"
        :options="difficulties"
        :required="true"
        :error="error.level"
      />
      <div class="flex justify-evenly">
        <Button class="mt-4" :name="$t('confirm')" scheme="primary" btnType="submit" />
        <Button linkTo="/users/profile" class="mt-4" :name="$t('cancel')" scheme="secondary" />
      </div>
    </form>
  </div>
</template>

<script>
import Button from "~/components/common/Button.vue";
import languages from "~/static/languages";
import difficulties from "~/static/difficulties";
export default {
  components: {
    Button,
  },
  data() {
    return {
      user: {
        username: this.$auth.user.username,
        email: this.$auth.user.email,
        learning_language: this.$auth.user.learning_language,
        level: this.$auth.user.level,
      },
      error: "",
      languages,
      difficulties,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await this.$axios.$put("/auth/user/", {
          ...this.user,
        });
        this.$router.push(this.localePath("/users/profile"));
        this.$toast.success("Successfully Edited User Infos");
        this.$auth.fetchUser();
      } catch (err) {
        console.dir(err);
        this.$toast.error("An error occured, please try again");
        this.error = err.response.data;
      }
    },
  },
};
</script>

<i18n lang="yaml">
  en:
    header: "Edit Profile"
    username: "Username"
    email: 'Email'
    language: "Language learned"
    level: "Level in above language"
    confirm: "Confirm Edit"
    cancel: "Cancel"
  zh:
    header: "编辑用户资料"
    username: "用户名"
    email: "电子邮件"
    language: "学习的语言"
    level: "上述语言水平"
    confirm: "确认"
    cancel: "取消"
</i18n>
