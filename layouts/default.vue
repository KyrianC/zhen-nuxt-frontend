<template>
  <div class="min-h-screen bg-primary text-gray-300">
    <NavBar />
    <Nuxt class="mb-12 md:ml-14 md:mb-0" />
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
