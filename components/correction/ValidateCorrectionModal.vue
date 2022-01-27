<template>
  <div>
    <Button
      @handleClick="showModal = true"
      class="mx-2"
      scheme="primary"
      name="validate this Correction"
    />
    <Modal v-show="showModal" @close="showModal = false" @confirm="validateCorrection">
      <template v-slot:header>{{ $t('header') }}</template>
      <template v-slot:body>
        {{ $t('body') }}
        <br />
        <i>{{ $t('body_note') }}</i>
      </template>
      <template v-slot:primary-btn>
        <Button :name="$t('validate')" scheme="primary" />
      </template>
      <template v-slot:secondary-btn>
        <Button :name="$t('cancel')" scheme="secondary" />
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
          this.$t("success", { author: this.correction.author.username })
        );
        this.showModal = false;
      } catch (e) {
        this.$toast.error(this.$t("error"));
        console.error(e);
      }
    },
  },
};
</script>

<i18n lang="yaml">
  en:
    success: "Validated Correction by {author}"
    error: "something went wrong."
    header: "Validate this correction"
    body: "Validating this correction means, when users want to read your text, they will see this corrected version of the text instead of your original one. You can still validate an other correction later if you change your mind about which one is better."
    body_note: "Note: Other users won't be able to see the corrections notes"
    validate: "Validate"
    cancel: "Cancel"
  zh:
    success: "{author} 验证的纠正"
    error: "出问题了。"
    header: "验证此纠正"
    body: "验证此纠正意味着，当用户想要阅读您的文本时，他们将看到该文本的纠正版本，而不是您的原始版本。 如果您改变对哪个更好的想法，您仍然可以稍后验证另一个纠正。"
    body_note: "注意：其他用户将无法看到纠正说明"
    validate: "验证"
    cancel: "取消"

</i18n>
