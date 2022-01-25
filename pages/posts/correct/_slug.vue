<template>
  <div class="px-3 bg-secondaryBackground flex flex-col items-center min-h-screen">
    <h1
      class="my-4 text-2xl font-bold text-center border-b-2 capitalize"
      :class="`border-difficulty${post.difficulty}-400`"
    >
      Correct
      <span class="italic">"{{ post.title }}"</span>
    </h1>
    <form class="flex-grow" method="POST">
      <FormInput
        label="Title"
        name="title"
        type="text"
        v-model="correction.title"
        :defaultValue="post.title"
        :error="error.title"
        :required="true"
      />
      <FormInput
        label="Text"
        name="content"
        type="textarea"
        v-model="correction.content"
        :defaultValue="post.content"
        :error="error.content"
        :required="true"
      />
      <FormInput
        label="Notes"
        name="note"
        type="textarea"
        rows="3"
        :placeholder="notesPlaceholder"
        v-model="correction.note"
        :error="error.note"
        :required="false"
      />
      <ScoreInput
        :correction="correction"
        :isCorrectionNotNeeded="isCorrectionNotNeeded"
        :error="error"
      />
      <div class="mt-4">
        <Button
          v-if="isCorrectionNotNeeded"
          @handleClick.prevent="diff"
          name="No errors!"
          scheme="primary"
          size="lg"
        />
        <Button v-else @handleClick.prevent="diff" name="Submit" scheme="primary" size="lg" />
        <Button :linkTo="`/posts/${post.slug}`" name="Cancel" scheme="secondary" class="ml-2" />
      </div>
    </form>
    <SubmitCorrectionModal
      v-show="showModal"
      @closeModal="showModal = false"
      :isCorrectionNotNeeded="isCorrectionNotNeeded"
      :postCorrect="postCorrect"
      :diffResult="diffResult"
    />
  </div>
</template>

<script>
import ScoreInput from "~/components/form/ScoreInput.vue";
import FormInput from "~/components/form/FormInput";
import Button from "~/components/common/Button.vue";
import SubmitCorrectionModal from "~/components/correction/SubmitCorrectionModal.vue";
import diffMatchPatch from "diff-match-patch";
export default {
  components: {
    FormInput,
    ScoreInput,
    SubmitCorrectionModal,
    Button,
  },
  middleware: "auth",
  async asyncData({ params, $axios }) {
    try {
      const post = await $axios.$get(`/posts/${params.slug}/`);
      return { post };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      correction: {
        title: "",
        content: "",
        slug: "",
        note: "Perfect",
        score: 10,
        score_comment: "",
      },
      showModal: false,
      diffResult: [],
      error: {},
    };
  },
  methods: {
    diff() {
      var dmp = new diffMatchPatch();
      var diff = dmp.diff_main(this.post.content, this.correction.content);
      dmp.diff_cleanupSemantic(diff);
      this.diffResult = diff;
      this.showModal = true;
    },
    async postCorrect() {
      try {
        const res = await this.$axios.$post(
          `/posts/correct/${this.post.slug}/`,
          {
            /* HACK can't set post.title and post.content as default values to
            this.correction directly because of asyncdata, if correction.title
            or correction.content was unchanged it would send and empty string.
            so use this method to send post values in that case */
            title: this.correction.title || this.post.title,
            content: this.correction.content || this.post.content,
            slug: this.post.slug,
            note: this.correction.note,
            score: this.correction.score,
            score_comment: this.correction.score_comment,
          }
        );
        this.$router.push({ name: "posts" });
        this.$toast.success(
          `Your correction has been sent to ${this.post.author.username}`
        );
      } catch (err) {
        console.log(err);
        this.error = err.response.data;
        this.$toast.error("An error occured, please try again");
        this.diffResult = [];
      }
    },
  },
  computed: {
    isCorrectionNotNeeded() {
      return (
        (!this.correction.title || this.correction.title == this.post.title) &&
        (!this.correction.content ||
          this.correction.content == this.post.content)
      );
    },
    notesPlaceholder() {
      const authorNativeLanguage =
        this.post.author.learning_language == "zh" ? "English" : "Chinese";
      const learningLanguage = this.post.author.get_learning_language_display;
      const learningLevel = this.post.author.get_level_display;
      const text = `Notes about the correction that can help the author improve (please write it in at most ${learningLevel} level ${learningLanguage} or in ${authorNativeLanguage} to help the author understand)`;
      return text;
    },
  },
  created() {
    if (this.$auth.user.pk == this.post.author.pk) {
      this.$router.push({ name: "posts" });
    }
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
