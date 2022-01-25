<template>
  <div class="min-h-screen flex justify-center items-center">
    <form class="bg-primary p-12 rounded-md" method="POST" @submit.prevent="completeUserProfile">
      <h1 class="text-3xl text-center font-bold mb-4">{{ $t('title') }}</h1>
      <FormInput
        type="select"
        v-model="userDetail.learning_language"
        :label="$t('language')"
        name="language"
        :options="languages"
        :required="true"
        :error="error.learning_language"
      />
      <FormInput
        type="select"
        v-model="userDetail.level"
        name="difficulty"
        :label="$t('difficulty')"
        :options="difficulties"
        :required="true"
        :error="error.level"
      />
      <p
        class="text-red-500"
        v-for="(message, index) in error.non_field_errors"
        :key="index"
      >{{ message }}</p>
      <Button :name="$t('submit')" btnType="submit" scheme="primary" />
    </form>
  </div>
</template>

<script>
import FormInput from "~/components/form/FormInput.vue";
import Button from "~/components/common/Button.vue";
import difficulties from "~/static/difficulties";
import languages from "~/static/languages";
export default {
  components: {
    FormInput,
    Button,
  },
  middleware: "auth",
  data() {
    return {
      userDetail: {
        username: this.$auth.user.username,
        email: this.$auth.user.email,
        learning_language: "en",
        level: "elementary",
      },
      error: "",
      languages,
      difficulties,
    };
  },
  methods: {
    async completeUserProfile() {
      try {
        var response = await this.$axios.$put("/auth/user/", {
          ...this.userDetail,
        });
        if (
          response.level !== "unset" &&
          response.learning_language !== "unset"
        ) {
          // BUG this.$router.push & .replace doesn't work
          // maybe because redirect from extern page or because auth module redirect
          this.$router.push(localePath("/"));
          this.$toast.success(this.$t("success"));
        }
      } catch (err) {
        console.log(err);
        this.error = err.response.data;
        this.$toast.error(this.$t("error"));
      }
    },
  },
  beforeCreate() {
    if (
      this.$auth.user.level != "unset" &&
      this.$auth.learning_language != "unset"
    ) {
      this.$router.push(this.localePath("/users/profile"));
    }
  },
};
</script>

<i18n lang="yaml">
  en:
    success: "Your profile is now complete!"
    error: "An error occurred, please try again"
    title: "Complete your Profile"
    language: "Language to learn"
    difficulty: "Your level of proficiency in the language above"
    submit: "Submit"
  zh:
    success: "您的个人资料现已完成！"
    error: "发生错误，请重试"
    title: "完成您的个人资料"
    language: "学习语言"
    difficulty: "您对上述语言的熟练程度"
    submit: "确认"
</i18n>
