<template>
  <div
    class="px-3 bg-secondaryBackground flex flex-col items-center min-h-screen"
  >
    <h1
      class="my-4 text-2xl font-bold text-center border-b-2 capitalize"
      :class="`border-${post.difficulty}-400`"
    >
      {{ post.text.title }}
    </h1>
    <p class="italic">Written by {{ post.text.author.username }}</p>
    <p class="text-justify mx-2 my-4 text-lg max-w-prose whitespace-pre-line">
      {{ post.text.original_content }}
    </p>
    <button
      v-if="$auth.loggedIn && $auth.user.pk == post.text.author.id"
      @click.prevent="deleteModal = true"
    >
      Delete Post
    </button>
    <NuxtLink
      v-if="
        $auth.loggedIn
          ? $auth.user.language !== post.language &&
            $auth.user.pk !== post.text.author.id
          : true
      "
      :to="`/posts/correct/${post.slug}`"
      >Correct Post</NuxtLink
    >
  </div>
</template>

<script>
export default {
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
      mode
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
        let response = await this.$axios.$delete(`${this.$route.fullPath}/`);
        // Redirect here
      } catch (err) {
        console.log(err);
      }
    }
  }
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
  transform: translate(100%, 0);
  opacity: 0;
  z-index: 0;
}

.slide-right-enter-to {
  position: absolute;
  top: 0;
}

.slide-left-leave-to {
  transform: translate(-100%, 0);
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
