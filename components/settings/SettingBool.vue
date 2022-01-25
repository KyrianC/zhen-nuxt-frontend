<template>
  <div class="flex py-4 justify-between items-center">
    <p>{{ label }}:</p>
    <div class="flex items-center">
      <span class="text-sm">{{ Object.entries(values)[0][1] }}</span>
      <label
        @click="checked = !checked"
        class="box-content mx-2 relative border-2 border-secondary rounded-full h-6 w-12 bg-secondary"
      >
        <div
          class="h-6 w-6 bg-secondaryBackground rounded-full transition transform"
          :class="checked && 'translate-x-full'"
        />
      </label>
      <span class="text-sm">{{ Object.entries(values)[1][1] }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    values: Object,
  },
  data() {
    return { checked: false };
  },
};
</script>

<style>
</style>
