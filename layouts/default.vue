<template>
  <div class="min-h-screen bg-secondaryBackground text-gray-300">
    <NavBar />
    <!-- <BackLink /> -->
    <Nuxt class="pb-12 md:mb-0 md:pl-14" />
    <!-- margin so content doesn't stay under navbar -->
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import BackLink from "@/components/BackLink";
export default {
  components: {
    NavBar,
    BackLink,
  },
};
</script>
