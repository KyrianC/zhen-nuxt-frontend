<template>
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
    <template v-slot:primary-btn>
      <Button name="Submit Correction" scheme="primary" />
    </template>
    <template v-slot:secondary-btn>
      <Button name="Cancel" scheme="secondary" />
    </template>
  </Modal>
</template>

<script>
import Modal from "~/components/common/Modal.vue";
export default {
  components: {
    Modal,
  },
  props: {
    diffResult: Array,
  },
};
</script>
