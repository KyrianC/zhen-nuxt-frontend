<template>
  <div class="bg-primary text-gray-300">
    <NavBar />
    <Nuxt class="md:ml-14 px-3" />
    <!-- margin left when navbar become fixed on the right so content doesn't stay under navbar -->
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
