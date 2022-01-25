<template>
  <div
    id="top-bar"
    class="flex items-center justify-between p-2 md:pl-4 md:ml-12"
    :class="`bg-${background}`"
  >
    <transition name="fade">
      <BackLink v-if="showBackLink" />
      <!-- TODO logo -->
      <NuxtLink v-else to="/" class="text-xl md:text-2xl">ZHEN</NuxtLink>
    </transition>
    <AccountInfo />
  </div>
</template>

<script>
import AccountInfo from "~/components/AccountInfo.vue";
import BackLink from "~/components/BackLink.vue";
export default {
  components: {
    AccountInfo,
    BackLink,
  },
  data() {
    return {
      secondaryBgPages: ["posts", "users-profile"],
      backLinkExclude: ["index", "posts", "afterRegister", "complete-profile"],
    };
  },
  computed: {
    background() {
      return this.secondaryBgPages.includes(this.$route.name)
        ? "primary"
        : "secondaryBackground";
    },
    showBackLink() {
      return !this.backLinkExclude.includes(this.$route.name);
    },
    mounted() {
      console.error(this.$route, this.$router);
    },
  },
};
</script>

<style scoped>
#top-bar {
  transition: backgroud-color 0.5s ease-in-out;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  position: absolute;
  opacity: 0;
}
</style>
