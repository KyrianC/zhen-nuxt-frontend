<template>
  <div class="flex flex-col items-center justify-center md:py-4">
    <form
      @submit.prevent="postCreate"
      method="POST"
      class="flex flex-col items-left justify-center bg-primary p-8 md:rounded-md"
    >
      <h1 class="text-2xl text-center font-bold">{{ $t('header') }}</h1>
      <FormInput
        type="select"
        :label="$t('difficulty')"
        v-model="post.difficulty"
        name="difficulty"
        :options="difficulties"
        :selected="post.difficulty"
        :error="error.difficulty"
      />
      <FormInput
        type="text"
        :label="$t('title')"
        :placeholder="$t('title_placeholder', {lang: $auth.user.learning_language == 'zh' ? $t('english') : $t('chinese')})"
        v-model="post.title"
        :required="true"
        name="title"
        :error="error.title"
      />
      <FormInput
        :label="$t('description')"
        name="description"
        :placeholder="$t('description_placeholder', {lang: $auth.user.learning_language == 'zh' ? $t('english') : $t('chinese')})"
        type="text"
        v-model="post.description"
        :required="true"
        :error="error.description"
      />
      <FormInput
        :label="$t('content')"
        type="textarea"
        :placeholder="$t('content_placeholder', {lang: $auth.user.learning_language == 'zh' ? $t('chinese') : $t('english')})"
        v-model="post.content"
        name="content"
        :required="true"
        :error="error.content"
      />
      <Button :name="$t('submit')" scheme="primary" btnType="submit" />
    </form>
  </div>
</template>

<script>
import FormInput from "@/components/form/FormInput.vue";
import Button from "~/components/common/Button.vue";
import languages from "@/static/languages";
import difficulties from "@/static/difficulties";
export default {
  components: {
    FormInput,
    Button,
  },
  middleware: "auth",
  data() {
    return {
      post: {
        title: "",
        slug: "",
        description: "",
        content: "",
        language: this.$auth.user.learning_language,
        difficulty: this.$auth.user.level,
      },
      languages: languages[this.$i18n.getLocaleCookie()],
      difficulties: difficulties[this.$i18n.getLocaleCookie()],
      error: "",
    };
  },
  methods: {
    async postCreate() {
      console.log(this.$route);
      try {
        let response = await this.$axios.$post("/posts/create/", {
          ...this.post,
        });
        this.$router.push(this.localePath(`/posts/${this.post.slug}`));
        this.$toast.success(this.$t("success", { title: this.post.title }));
        this.$auth.fetchUser();
        console.log(response);
      } catch (err) {
        this.error = err.response.data;
        this.$toast.error(this.$t("error"));
        console.log(err);
      }
    },
  },
};
</script>

<i18n lang="yaml">
  en:
    header: "Create a Post"
    difficulty: "Difficulty"
    title: "Title"
    title_placeholder: "Title (in {lang})"
    description: "Description"
    description_placeholder: "Description (in {lang})"
    content: "Content"
    content_placeholder: "Text (in {lang})"
    english: "English"
    chinese: "Chinese"
    success: "Successfully created \"{title}\""
    error: "An error occured, please try again"
    submit: "Submit"
  zh:
    header: "写一段文字"
    difficulty: "难度级别"
    title: "标题"
    title_placeholder: "标题 ({lang})"
    description: "描述"
    description_placeholder: "描述({lang})"
    content: "文字"
    content_placeholder: "文字 ({lang})"
    english: "英文"
    chinese: "中文"
    success: "成功创建\"{title}\""
    error: "发生错误，请重试"
    submit: "确认"
</i18n>
