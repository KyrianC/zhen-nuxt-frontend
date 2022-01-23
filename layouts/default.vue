<template>
  <div class="min-h-screen bg-secondaryBackground text-gray-300">
    <NavBar />
    <TopBar />
    <Nuxt class="pb-12 md:mb-0 md:pl-14" />
    <!-- margin so content doesn't stay under navbar -->
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import TopBar from "@/components/TopBar";
export default {
  components: {
    NavBar,
    TopBar,
  },
};
</script>
