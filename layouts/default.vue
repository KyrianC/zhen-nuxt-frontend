<template>
  <div class="min-h-screen bg-primary text-gray-300">
    <NavBar />
    <Nuxt class="pb-12 md:mb-0 md:pl-14" />
    <!-- margin so content doesn't stay under navbar -->
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  components: {
    NavBar
  }
};
</script>
