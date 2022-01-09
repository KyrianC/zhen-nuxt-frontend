<template>
  <div
    @click.self="close"
    class="fixed flex bg-black bg-opacity-50 justify-center items-center h-full w-full overflow-hidden"
  >
    <div class="flex w-content items-center flex-col bg-primary p-8 max-h-3/4">
      <span class="ml-auto block pb-4">X</span>
      <h3 class="text-center text-xl font-bold">
        <slot name="header">Info</slot>
      </h3>
      <div class="correction-content w-full overflow-y-scroll">
        <p class="whitespace-pre-line max-w-prose text-justify p-3 mx-auto">
          <slot name="body"></slot>
        </p>
      </div>
      <div class="flex">
        <div class="m-1" @click="confirm">
          <slot name="primary-btn"></slot>
        </div>
        <div class="m-1" @click="close">
          <slot name="secondary-btn">OK</slot>
        </div>
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
    },
  },
};
</script>

<style scoped>
.correction-content {
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
}
.correction-content::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}
</style>
