<template>
  <div>
    <label v-if="label" for="name" class="block pb-1 pt-3">{{ label }}:</label>

    <textarea
      v-if="type === 'textarea'"
      :name="name"
      rows="15"
      cols="60"
      tabindex
      :placeholder="placeholder"
      @input="handleInput($event.target.value)"
      class="mb-4 text-black w-full h-full text-lg p-5"
      :class="error && 'border-2 border-red-500'"
      :required="required"
      :disabled="disabled"
      :value="defaultValue"
    ></textarea>

    <select
      class="mb-4 text-black w-1/3"
      v-else-if="type === 'select'"
      :name="name"
      @input="handleInput($event.target.value)"
      :class="error && 'border-2 border-red-500'"
      :required="required"
      :disabled="disabled"
    >
      <option
        :selected="selected == key"
        v-for="(value, key) in options"
        :key="key"
        :value="key"
      >{{ value }}</option>
    </select>

    <input
      class="mb-1 p-1 text-black"
      v-else
      :type="type"
      :name="name"
      :placeholder="placeholder"
      @input="handleInput($event.target.value)"
      :class="error && 'border-2 border-red-500'"
      :required="required"
      :disabled="disabled"
      :value="defaultValue"
    />
    <p class="text-red-500" v-for="message in error" :key="message">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: {
    type: String,
    name: String,
    label: String,
    placeholder: String,
    options: Object,
    error: Array,
    required: Boolean,
    disabled: Boolean,
    selected: String,
    defaultValue: String,
  },
  methods: {
    handleInput(input) {
      this.$emit("input", input);
    },
  },
};
</script>
