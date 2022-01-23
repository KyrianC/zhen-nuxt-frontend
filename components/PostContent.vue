<template>
  <section id="original-post" class="w-full px-3 bg-secondaryBackground flex flex-col items-center">
    <h1
      class="mb-4 text-2xl font-bold text-center border-b-2 capitalize"
      :class="`border-difficulty${post.difficulty}-400`"
    >{{ post.title }}</h1>
    <DeletePostModal v-if="$auth.loggedIn && $auth.user.posts.includes(post.pk)" :post="post" />
    <p v-else class="italic">Written by {{ post.author.username }}</p>
    <p
      v-if="diff && diff.length"
      class="text-justify mx-2 my-4 text-lg text-gray-300 md:text-xl leading-8 max-w-prose whitespace-pre-line"
    >
      <span
        v-for="(word, index) in diff"
        :key="`${word[0]}-${index}`"
        :class="
              word[0] == 1
                ? 'text-green-400 underline'
                : word[0] == -1 && 'text-red-400 line-through'
            "
      >{{ word[1] }}</span>
    </p>
    <p
      v-else
      class="text-justify mx-2 my-4 text-lg text-gray-300 md:text-xl leading-8 max-w-prose whitespace-pre-line"
    >{{ post.content }}</p>
    <!-- don't show if if is valid (so is correction) or if viewed by its author -->
    <div v-if="post.note">
      Corrector's Notes:
      <p>{{ post.note }}</p>
    </div>
    <Button
      class="mt-8"
      v-if="showCorrectionBtn"
      :linkTo="`/posts/correct/${post.slug}`"
      scheme="primary"
      name="Correct"
    />
  </section>
</template>

<script>
import DeletePostModal from "~/components/posts/DeletePostModal.vue";
import Button from "~/components/common/Button.vue";
export default {
  components: {
    DeletePostModal,
    Button,
  },
  props: {
    post: Object,
    diff: Array,
  },
  computed: {
    canCorrectPost() {
      const loggedIn = this.$auth.loggedIn;
      if (!loggedIn) {
        return false;
      }
      const level = this.$auth.user.level >= this.post.difficulty;
      const language = this.$auth.user.learning_language != this.post.language;
      const author = this.$auth.user.pk != this.post.author.pk;
      return level && language && author;
    },
    showCorrectionBtn() {
      // show only if is not valid correction
      // show for not logged users
      // don't show if user is author or if user is corrector
      // don't show if language learned is same as post language and
      // user's level is under post level
      const isValid = this.post.is_valid;
      const loggedIn = this.$auth.loggedIn;
      if (!loggedIn) {
        return !isValid;
      } else {
        const user = this.$auth.user;
        const isAuthor = user.posts.includes(this.post.id);
        const isCorrector = user.corrected.includes(this.post.id);
        const hasHigherLanguageSkill =
          user.learning_language == this.post.language
            ? user.level > this.post.difficulty
            : true;
        return !isValid && !isAuthor && !isCorrector && hasHigherLanguageSkill;
      }
    },
  },
};
</script>

<style scoped>
#original-post {
  transition: width 0.3s ease-in-out;
}
</style>
