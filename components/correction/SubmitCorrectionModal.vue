<template>
  <Modal @close="$emit('closeModal')" @confirm="postCorrect">
    <template v-slot:header>{{ $t('header') }}</template>
    <template v-slot:body>
      <span
        v-for="(word, index) in diffResult"
        v-show="!isCorrectionNotNeeded"
        :key="`${word[0]}-${index}`"
        :class="
              word[0] == 1
                ? 'text-green-400 underline'
                : word[0] == -1 && 'text-red-400 line-through'
            "
      >{{ word[1] }}</span>
    </template>
    <template v-slot:primary-btn>
      <Button :name="isCorrectionNotNeeded ? $t('no_error') : $t('submit')" scheme="primary" />
    </template>
    <template v-slot:secondary-btn>
      <Button @handleClick="$emit('closeModal')" :name="$t('cancel')" scheme="secondary" />
    </template>
  </Modal>
</template>

<script>
import Modal from "~/components/common/Modal.vue";
import Button from "~/components/common/Button.vue";
export default {
  components: {
    Modal,
    Button,
  },
  props: {
    diffResult: Array,
    postCorrect: Function,
    isCorrectionNotNeeded: Boolean,
  },
};
</script>

<i18n lang="yaml">
  en:
    header: "Your Correction"
    no_error: "10/10 no errors"
    submit: "Submit Correction"
    cancel: "Cancel"
  zh:
    header: "您的纠正"
    no_error: "10/10 没有任何错误"
    submit: "提交纠正"
    cancel: "取消"
</i18n>
