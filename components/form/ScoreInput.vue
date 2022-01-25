<template>
  <div>
    <div class="flex items-center justify-left">
      <div class="flex">
        <FormInput
          :label="$t('score')"
          name="score"
          type="number"
          v-model="correction.score"
          :required="true"
          :disabled="isCorrectionNotNeeded"
          :defaultValue="isCorrectionNotNeeded ? 10 : 0"
          class="w-20"
        />
        <span class="self-end mb-5 ml-2 font-bold text-lg">/10</span>
      </div>

      <FormInput
        class="flex-1 ml-4"
        :label="$t('comment')"
        name="score_comment"
        type="text"
        v-model="correction.score_comment"
        :required="true"
        :disabled="isCorrectionNotNeeded"
        :defaultValue="isCorrectionNotNeeded ? 'Great!' : ''"
        placeholder="Ex: Great!"
      />
    </div>
    <p class="text-red-500" v-for="message in error.score" :key="message">{{ message }}</p>
    <p class="text-red-500" v-for="message in error.score_comment" :key="message">{{ message }}</p>
  </div>
</template>

<script>
import FormInput from "~/components/form/FormInput.vue";
export default {
  components: {
    FormInput,
  },
  props: {
    isCorrectionNotNeeded: Boolean,
    error: Object,
    correction: Object,
  },
  methods: {
    handleInput(input) {
      this.$emit("input", input);
    },
  },
};
</script>

<i18n lang="yaml">
  en:
    score: "Score"
    comment: "comment"
  zh:
    score: "成绩"
    comment: "评论"
</i18n>
