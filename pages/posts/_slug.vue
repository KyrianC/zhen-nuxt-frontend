<template>
  <div class="px-3 bg-secondaryBackground flex flex-col items-center min-h-screen">
    <h1
      class="my-4 text-2xl font-bold text-center border-b-2 capitalize"
      :class="`border-difficulty${post.difficulty}-400`"
    >{{ post.title }}</h1>
    <p class="italic">Written by {{ post.author.username }}</p>
    <p
      class="text-justify mx-2 my-4 text-lg text-gray-300 md:text-xl leading-8 max-w-prose whitespace-pre-line"
    >{{ post.content }}</p>
    <!-- @click.prevent="showDeleteModal = true" -->
    <Button
      v-if="$auth.loggedIn && $auth.user.pk == post.author.pk"
      @handleClick.prevent="showDeleteModal = true"
      name="Delete Post"
      scheme="danger"
    />
    <Modal v-show="showDeleteModal" @close="showDeleteModal = false" @confirm="deletePost">
      <template v-slot:header>
        Are you sure you want to Delete
        <span class="capitalize italic">"{{ post.title }}"</span>
      </template>
      <template v-slot:primary-btn>
        <Button name="Delete" scheme="danger" />
      </template>
      <template v-slot:secondary-btn>
        <Button name="Cancel" scheme="secondary" />
      </template>
    </Modal>
    <Button
      v-if="canCorrectPost"
      :linkTo="`/posts/correct/${post.slug}`"
      name="Correct Post"
      scheme="primary"
    />
  </div>
</template>

<script>
import Modal from "~/components/Modal";
import Button from "~/components/common/Button.vue";
export default {
  components: {
    Modal,
    Button,
  },
  transition(to, from) {
    let name = "page";
    let mode = "out-in";
    if (from.name == "posts") {
      name = "slide-left";
      mode = "";
    } else if (to.name === "posts") {
      name = "slide-right";
      mode = "";
    }
    return {
      name,
      mode,
    };
  },
  data() {
    return {
      showDeleteModal: false,
    };
  },
  async asyncData({ route, $axios }) {
    const post = await $axios.$get(`${route.fullPath}/`);
    console.log(post);
    return { post };
  },
  methods: {
    async deletePost() {
      try {
        await this.$axios.$delete(`${this.$route.fullPath}/`);
        this.$router.push({ name: "posts" });
        this.$toast.success(`${post.title} has successfully been deleted`);
      } catch (err) {
        console.log(err);
        this.$toast.error("An error occured, please try again");
      }
    },
  },
  computed: {
    canCorrectPost() {
      const loggedIn = this.$auth.loggedIn;
      const level = this.$auth.user.level >= this.post.difficulty;
      const language = this.$auth.user.learning_language != this.post.language;
      const author = this.$auth.user.pk != this.post.author.pk;
      return loggedIn && level && language && author;
    },
  },
};
</script>

<style>
/* BUG navbar's margin makes it bug */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.4s ease-in-out, opacity 0.2s linear;
  width: 100vw;
  z-index: 0;
  /* margin-left: 3.5rem; */
  /* overflow: hidden; */
}

.slide-right-leave-active,
.slide-left-leave-active {
  position: absolute;
}

.slide-right-enter {
  transform: translate(-100%, 0);
}

.slide-right-leave-to {
  transform: translate(30%, 0);
  opacity: 0;
  z-index: 0;
}

.slide-right-enter-to {
  position: absolute;
  top: 0;
}

.slide-left-leave-to {
  transform: translate(-30%, 0);
  opacity: 0;
  z-index: 0;
}

.slide-left-enter {
  transform: translate(100%, 0);
}

/* HACK otherwise scrollbar appears */
body {
  overflow-x: hidden;
}
</style>
