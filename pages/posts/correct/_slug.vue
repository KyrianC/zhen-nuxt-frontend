<template>
  <div class="px-3 bg-secondaryBackground flex flex-col items-center min-h-screen">
    <h1
      class="my-4 text-2xl font-bold text-center border-b-2 capitalize"
      :class="`border-${post.difficulty}-400`"
    >
      Correct
      <span class="italic">"{{ post.text.title }}"</span>
    </h1>
    <form class="flex-grow" method="POST">
      <FormInput
        label="Title"
        name="title"
        type="text"
        v-model="correction.title"
        :defaultValue="post.text.title"
        :error="error.title"
        :required="true"
      />
      <FormInput
        label="Text"
        name="content"
        type="textarea"
        v-model="correction.original_content"
        :defaultValue="post.text.original_content"
        :error="error.original_content"
        :required="true"
      />
      <button @click.prevent="diff">submit</button>
    </form>
    <transition name="fade">
      <Modal v-show="diffResult.length" @close="diffResult = []" @confirm="postCorrect">
        <template v-slot:header>Your Correction</template>
        <template v-slot:body>
          <span
            v-for="(word, index) in diffResult"
            :key="`${word[0]}-${index}`"
            :class="
              word[0] == 1
                ? 'text-green-400 underline'
                : word[0] == -1 && 'text-red-400 line-through'
            "
          >{{ word[1] }}</span>
        </template>
        <template v-slot:primary-btn>Submit Correction</template>
        <template v-slot:secondary-btn>Cancel</template>
      </Modal>
    </transition>
  </div>
</template>

<script>
import Modal from "~/components/Modal";
import formInput from "~/components/form/formInput";
import diffMatchPatch from "diff-match-patch";
export default {
  component: {
    FormInput: formInput,
    Modal,
  },
  middleware: "auth",
  async asyncData({ params, $axios }) {
    try {
      const post = await $axios.$get(
        `/posts/${encodeURIComponent(params.slug)}/`
      );
      return { post };
    } catch (err) {
      console.log(err);
    }
  },
  data() {
    return {
      correction: {
        title: "",
        original_content: "",
      },
      diffResult: [],
      error: "",
    };
  },
  methods: {
    diff() {
      var dmp = new diffMatchPatch();
      var diff = dmp.diff_main(
        this.post.text.original_content,
        this.correction.original_content
      );
      dmp.diff_cleanupSemantic(diff);
      this.diffResult = diff;
    },
    async postCorrect() {
      try {
        const res = await this.$axios.$post(
          `/posts/correct/${this.post.slug}/`,
          {
            /* HACK can't set title and original_content default values to post
            values directly because of asyncdata, so if input is unchanged
            it would send and empty string */
            title: this.correction.title || this.post.text.title,
            original_content:
              this.correction.original_content ||
              this.post.text.original_content,
          }
        );
        console.log(res);
        this.$router.push({ name: "posts" });
        this.$toast.success(
          `Your correction has been sent to ${this.post.text.author.username}`
        );
      } catch (err) {
        console.log(err);
        this.error = err.response.data;
        this.$toast.error("An error occured, please try again");
      }
    },
  },
  created() {
    if (this.$auth.user.pk == this.post.text.author.pk) {
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
