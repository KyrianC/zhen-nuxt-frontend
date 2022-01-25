<template>
  <div
    @click="$emit('handleClick', $event)"
    class="flex bg-primary shadow-2xl border-2 p-4 rounded-lg cursor-pointer"
    :class="selected ? 'border-white' : 'border-black'"
  >
    "{{ correction.score_comment }}": {{ correction.score }}/10
    <br />
    {{ $t('by', {author: correction.author.username}) }}
    <p class="ml-auto">
      <span class="text-green-500" v-if="correction.is_valid">{{ $t('validated') }}</span>
      <span class="text-red-400" v-else-if="!correction.seen_by_author">{{ $t('new') }}</span>
    </p>
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

<i18n lang="yaml">
  en:
    validated: "Validated"
    new: "New!"
    by: "by {author}"
  zh:
    validated: "已验证"
    new: "新的！"
    by: "{author} 写的"
</i18n>
