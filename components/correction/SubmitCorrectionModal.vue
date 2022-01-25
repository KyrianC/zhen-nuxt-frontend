<template>
  <Modal @close="$emit('closeModal')" @confirm="postCorrect">
    <template v-slot:header>Your Correction</template>
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
      <Button
        :name="isCorrectionNotNeeded ? '10/10 no errors' : 'Submit Correction'"
        scheme="primary"
      />
    </template>
    <template v-slot:secondary-btn>
      <Button @handleClick="$emit('closeModal')" name="Cancel" scheme="secondary" />
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
