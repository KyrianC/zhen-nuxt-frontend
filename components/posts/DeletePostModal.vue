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
      <template v-slot:header>Are you sure you want to Delete this Post?</template>
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
        this.$toast.success(`${post.title} has successfully been deleted`);
      } catch (err) {
        console.log(err);
        this.$toast.error("An error occured, please try again");
      }
    },
  },
};
</script>
