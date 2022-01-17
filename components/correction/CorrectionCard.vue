<template>
  <div
    @click="$emit('handleClick', $event)"
    class="flex bg-primary shadow-2xl border-2 p-4 rounded-lg cursor-pointer"
    :class="selected ? 'border-white' : 'border-black'"
  >
    "{{ correction.score_comment }}": {{ correction.score }}/10
    <br />
    by {{ correction.author.username }}
    <span
      class="ml-auto text-green-500"
      v-if="correction.is_valid"
    >Validated</span>
  </div>
</template>

<script>
export default {
  props: {
    selectedCorrection: Object,
    correction: Object,
    selected: Boolean,
  },
};
</script>

<style>
</style>
