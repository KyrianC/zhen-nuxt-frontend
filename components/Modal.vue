<template>
  <div
    @click.self="close"
    class="fixed flex bg-black bg-opacity-50 justify-center items-center h-full w-full"
  >
    <div
      class="flex items-center flex-col w-11/12 md:w-2/3 bg-primary border-2 border-white p-3 max-h-3/4"
    >
      <h3 class="text-center text-xl font-bold">
        <slot name="header">Info</slot>
      </h3>
      <div class="w-full overflow-y-scroll">
        <p class="whitespace-pre-line max-w-prose text-justify p-3 mx-auto">
          <slot name="body"></slot>
        </p>
      </div>
      <div>
        <button
          class="m-2 bg-secondary p-2 text-primary border-2 border-secondary"
          @click="confirm"
        >
          <slot name="primary-btn"></slot>
        </button>
        <button
          class="m-2 p-2 text-secondary border-2 border-secondary"
          @click.self="close"
        >
          <slot name="secondary-btn">OK</slot>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    close() {
      this.$emit("close");
    },
    confirm() {
      this.$emit("confirm");
    }
  }
};
</script>
