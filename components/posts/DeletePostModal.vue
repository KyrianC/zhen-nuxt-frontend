<template>
  <div>
    <Button
      v-if="$auth.loggedIn && $auth.user.pk == post.author.pk"
      @handleClick.prevent="showDeleteModal = true"
      name="Delete Post"
      scheme="danger"
      size="xs"
    />
    <Modal v-show="showDeleteModal" @close="showDeleteModal = false" @confirm="deletePost">
      <template v-slot:header>{{ $t('header') }}</template>
      <template v-slot:primary-btn>
        <Button name="Delete" scheme="danger" />
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
    post: Object,
  },
  data() {
    return {
      showDeleteModal: false,
    };
  },
  methods: {
    async deletePost() {
      try {
        await this.$axios.$delete(`posts/${this.$route.params.slug}/`);
        this.$router.push({ name: "posts" });
        this.$toast.success(this.$t("toast_success", { title: post.title }));
      } catch (err) {
        console.log(err);
        this.$toast.error();
      }
    },
  },
};
</script>

<i18n lang="yaml">
  en:
    header: "Are you sure you want to Delete this Post?"
    delete: "Delete"
    cancel: "Cancel"
    toast_success: "{title} has successfully been deleted"
    error: "An error occured, please try again"
  zh:
    header: "你确定你要删除这个文章？"
    delete: "删掉"
    cancel: "取消"
    toast_success: "{title} 已成功删除"
    error: "An error occured, please try again"
</i18n>
