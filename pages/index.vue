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
        <NuxtLink to="/posts" class="m-3">
          <button
            class="transition duration-500 p-2 text-black bg-secondary border-2 border-secondary hover:bg-secondaryBackground hover:text-white"
          >Practice Reading</button>
        </NuxtLink>
        <NuxtLink to="/posts" class="m-3">
          <button
            class="transition duration-500 p-2 text-white border-b-2 border-secondary hover:bg-secondary hover:text-black hover:border-2"
          >Learn More</button>
        </NuxtLink>
      </div>
    </div>
    <section class="bg-primary h-96">hello</section>
  </div>
</template>

<script>
export default {
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
