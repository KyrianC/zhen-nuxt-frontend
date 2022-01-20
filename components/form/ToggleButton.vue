<template>
  <div class="flex items-center">
    <span class="text-sm">hello</span>
    <label
      @click="checked = !checked"
      class="box-content mx-2 relative border-2 border-secondary rounded-full h-6 w-12 bg-secondary"
    >
      <div
        class="h-6 w-6 bg-secondaryBackground rounded-full transition transform"
        :class="checked && 'translate-x-full'"
      />
    </label>
    <span class="text-sm">there</span>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      checked: false,
    };
  },
};
</script>

