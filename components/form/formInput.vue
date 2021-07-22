<template>
  <div>
    <label v-if="label" for="name" class="block mb-1">{{ label }}:</label>

    <textarea
      v-if="type === 'textarea'"
      :name="name"
      rows="10"
      cols="60"
      tabindex=""
      :placeholder="placeholder"
      @input="handleInput($event.target.value)"
      class="mb-4 text-black w-full h-2/3 text-xl p-4"
    ></textarea>

    <select
      class="mb-4 text-black w-1/3"
      v-else-if="type === 'select'"
      :name="name"
      @input="handleInput($event.target.value)"
    >
      <option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
        >{{ option.display }}</option
      >
    </select>

    <input
      class="mb-4 text-black"
      v-else="type !== 'textarea'"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      @input="handleInput($event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    name: String,
    label: String,
    placeholder: String,
    options: Array
  },
  methods: {
    handleInput(input) {
      this.$emit("input", input);
    }
  },
  created() {
    if (this.options) {
      this.options.forEach(option => {
        console.log(option.value, option.display);
      });
    }
  }
};
</script>
