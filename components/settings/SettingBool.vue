<template>
  <div class="flex py-4 justify-between items-center">
    <p>{{ label }}:</p>
    <ToggleButton />
  </div>
</template>

<script>
import ToggleButton from "~/components/form/ToggleButton.vue";
export default {
  components: {
    ToggleButton,
  },
  props: {
    label: String,
    valueOn: String,
    valueOff: String,
  },
};
</script>

<style>
</style>
