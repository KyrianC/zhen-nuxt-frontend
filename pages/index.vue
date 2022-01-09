<template>
  <div>
    <div
      class="h-screen py-4 flex justify-center items-center flex-col text-center text-opacity-100 bg-secondaryBackground"
    >
      <h1 class="font-bold text-5xl m-2">The Best Way to Learn is to</h1>
      <transition name="fade" mode="out-in">
        <h1
          class="text-5xl overflow-hidden mb-3"
          :class="`text-difficulty${index + 1}-400`"
          :key="words[index]"
        >{{ words[index] }}</h1>
      </transition>
      <p class="text-xl opacity-70 m-3">Read, write and help the community to improve</p>
      <div class="text-2xl flex flex-col md:flex-row my-3">
        <Button class="m-3" name="Practice Reading" scheme="primary" linkTo="/posts" />
        <Button class="m-3" name="Learn More" scheme="secondary" linkTo="/posts" />
      </div>
    </div>
    <section class="bg-primary h-96">hello</section>
  </div>
</template>

<script>
import Button from "~/components/common/Button.vue";
export default {
  components: {
    Button,
  },
  data() {
    return {
      words: ["Practice", "Read", "Write", "Correct", "Translate"],
      index: 0,
    };
  },
  mounted() {
    setInterval(() => {
      if (this.index == this.words.length - 1) {
        this.index = 0;
      } else {
        this.index++;
      }
    }, 2000);
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  /* position: absolute; */
}
</style>
