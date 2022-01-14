<template>
  <transition name="fade">
    <div
      ref="background"
      @click.self="close"
      class="fixed top-0 left-0 z-50 flex bg-black bg-opacity-50 justify-center items-center overflow-hidden h-screen w-screen"
    >
      <div
        id="children"
        class="relative flex w-content items-center flex-col bg-primary p-8 max-h-3/4"
      >
        <!-- TODO icon -->
        <span @click="close" class="ml-auto block cursor-pointer absolute top-0 right-2 text-xl">x</span>
        <h3 class="text-center text-xl font-bold">
          <slot name="header">Info</slot>
        </h3>
        <div class="correction-content my-2 w-full overflow-y-scroll">
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
  </transition>
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
