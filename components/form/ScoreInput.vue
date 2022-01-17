<template>
  <div class="flex items-center justify-left">
    <div class="flex">
      <FormInput
        label="Score"
        name="score"
        type="number"
        v-model="correction.score"
        :error="error.score"
        :required="true"
        :disabled="isCorrectionNotNeeded"
        :defaultValue="isCorrectionNotNeeded ? 10 : 0"
        class="w-20"
      />
      <span class="self-end mb-5 ml-2 font-bold text-lg">/10</span>
    </div>

    <FormInput
      class="flex-1 ml-4"
      label="Comment"
      name="score_comment"
      type="text"
      v-model="correction.score_comment"
      :error="error.score_comment"
      :required="true"
      :disabled="isCorrectionNotNeeded"
      :defaultValue="isCorrectionNotNeeded ? 'Great!' : ''"
      placeholder="Ex: Great!"
    />
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

<style>
</style>
