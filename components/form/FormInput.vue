<template>
  <div>
    <label v-if="label" for="name" class="block pb-1 pt-3 text-lg">
      {{ label }}:
      <span class="text-red-300 text-sm" v-if="required">*</span>
    </label>

    <textarea
      v-if="type === 'textarea'"
      :name="name"
      :rows="rows ? rows : 15"
      :cols="cols ? cols : 60"
      tabindex
      :placeholder="placeholder"
      @input="handleInput($event.target.value)"
      class="mb-5 text-black w-full h-full text-lg p-5"
      :class="error && 'border-2 border-red-500'"
      :required="required"
      :disabled="disabled"
      :value="defaultValue"
    ></textarea>

    <select
      class="mb-5 text-black w-full p-1 bg-white"
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
      class="mb-5 p-1 text-black w-full"
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
    defaultValue: String | Number,
    rows: String,
    cols: String,
  },
  methods: {
    handleInput(input) {
      this.$emit("input", input);
    },
  },
};
</script>
