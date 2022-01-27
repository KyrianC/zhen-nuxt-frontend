<template>
  <div class="flex py-4 justify-between items-center">
    <p>{{ label }}:</p>
    <div class="flex items-center">
      <span class="text-sm">{{ Object.entries(choices)[0][1] }}</span>
      <label
        @click="check"
        class="box-content mx-2 relative border-2 border-secondary rounded-full h-6 w-12 bg-secondary"
      >
        <div
          class="h-6 w-6 bg-secondaryBackground rounded-full transition transform"
          :class="checked && 'translate-x-full'"
        />
      </label>
      <span class="text-sm">{{ Object.entries(choices)[1][1] }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    choices: Object,
    value: String,
  },
  computed: {
    checked() {
      return this.value == Object.entries(this.choices)[1][0];
    },
  },
  methods: {
    check() {
      const i = this.checked ? 0 : 1;
      this.value = Object.entries(this.choices)[i][0];
      this.$emit("handleChange", this.value);
    },
  },
};
</script>

<style>
</style>
