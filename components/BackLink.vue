<template>
  <transition name="fade">
    <div
      @click="$router.go(-1)"
      class="top-2 left-2 absolute text-lg md:left-16 cursor-pointer"
      v-show="!backLinkExclude.includes($route.name)"
    >back</div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      backLinkExclude: ["index", "posts", "afterRegister", "complete-profile"],
    };
  },
  beforeCreate() {
    console.log(this.$route);
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  /* position: absolute; */
}
</style>
