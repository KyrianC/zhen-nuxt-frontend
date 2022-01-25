<template>
  <a class="flex items-center cursor-pointer" @click="goBack">
    <img src="/chevron.svg" alt="go back" class="transform rotate-90 inline h-3" />
    <span>Go back</span>
  </a>
</template>

<script>
export default {
  props: {
    href: String,
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  /* position: absolute; */
}
</style>
