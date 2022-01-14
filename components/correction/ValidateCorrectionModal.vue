<template>
  <div>
    <Button
      @handleClick="showModal = true"
      class="mx-2"
      scheme="primary"
      name="validate this Correction"
    />
    <Modal v-show="showModal" @close="showModal = false" @confirm="validateCorrection">
      <template v-slot:header>Validate this correction</template>
      <template v-slot:body>
        Validating this correction means, when users want to read your text, they will see this corrected version of the text instead of your original one.
        You can still validate an other correction later if you change your mind about which one is better.
        <br />
        <i>Note: Other users won't be able to see the corrections notes</i>
      </template>
      <template v-slot:primary-btn>
        <Button name="Select" scheme="primary" />
      </template>
      <template v-slot:secondary-btn>
        <Button name="Cancel" scheme="secondary" />
      </template>
    </Modal>
  </div>
</template>

<script>
import Button from "~/components/common/Button.vue";
import Modal from "~/components/common/Modal.vue";
export default {
  components: {
    Button,
    Modal,
  },
  props: {
    correction: Object,
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    async validateCorrection() {
      try {
        await this.$axios.$post(
          `posts/correction/validate/${this.correction.id}/`
        );
        this.$toast.success(
          `Validated Correction by ${this.correction.author.username}`
        );
        this.showModal = false;
      } catch (e) {
        this.$toast.error("something went wrong.");
        console.error(e);
      }
    },
  },
};
</script>
