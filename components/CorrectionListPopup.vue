<template>
  <div>
    <transition name="fade">
      <div
        id="background"
        @click="closeCorrections"
        v-show="showCorrections"
        class="md:hidden bg-black bg-opacity-50 w-screen h-screen fixed top-0 left-0"
      />
    </transition>
    <!-- show on phone/small screens only -->
    <!-- TODO fix transition glitching when screen is scrolled -->
    <transition name="popup">
      <section
        class="md:hidden fixed inset-x-0 top-16 min-h-screen bg-primary shadow-2xl rounded-3xl py-4 px-4 z-20"
        v-show="showCorrections"
        id="correction-list"
      >
        <!-- TODO change icon or somethin else -->
        <CommonButton @handleClick="closeCorrections" scheme="secondary" name="close" class="mb-4" />
        <div
          v-for="correction in corrections.results"
          :key="correction.id"
          @click="selectCorrection(correction, 'sm')"
          class="bg-primary shadow-2xl border-2 p-4 rounded-lg cursor-pointer"
          :class="(selectedCorrection && selectedCorrection.id == correction.id) ? 'border-white' : 'border-black'"
        >{{ correction.title }} - by {{ correction.author.username }}</div>
      </section>
    </transition>

    <!-- show on bigger screen -->
    <transition name="slide">
      <section
        v-show="showCorrections"
        class="hidden md:block fixed right-0 min-h-screen bg-primary w-1/3 p-4 z-20"
        id="correction-list"
      >
        <!-- TODO change to and Icon button -->
        <CommonButton
          @handleClick="closeCorrections"
          size="xs"
          name="hide"
          scheme="secondary"
          class="mb-3"
        />
        <div
          v-for="correction in corrections.results"
          :key="correction.id"
          @click="selectCorrection(correction, 'md')"
          class="bg-primary shadow-2xl border-2 p-4 rounded-lg cursor-pointer"
          :class="(selectedCorrection && selectedCorrection.id == correction.id) ? 'border-white' : 'border-black'"
        >{{ correction.title }} - by {{ correction.author.username }}</div>
      </section>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    showCorrections: Boolean,
    corrections: Object,
    selectCorrection: Function,
    selectedCorrection: Object | null,
    closeCorrections: Function,
  },
};
</script>

<style scoped>
.popup-enter-active,
.popup-leave-active {
  transition: all 0.3s ease-in-out;
}

.popup-enter,
.popup-leave-to {
  transform: translateY(100%);
  position: absolute;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
