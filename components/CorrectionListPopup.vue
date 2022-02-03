<template>
  <div>
    <!-- TODO DRY Refactor -->
    <transition name="fade">
      <div
        id="background"
        @click="closeCorrections"
        v-show="showCorrections"
        class="md:hidden bg-black bg-opacity-50 w-screen h-screen fixed top-0 left-0"
      />
    </transition>
    <!-- show on phone/small screens only -->
    <transition name="popup">
      <section
        class="md:hidden fixed inset-x-0 top-16 min-h-screen bg-primary shadow-2xl rounded-3xl py-4 px-4"
        v-show="showCorrections"
        id="correction-list"
      >
        <CommonButton
          @handleClick="closeCorrections"
          scheme="secondary"
          :name="$t('close')"
          class="mb-4"
        />
        <CorrectionCard
          v-for="correction in corrections.results"
          :correction="correction"
          :key="correction.id"
          :selected="selectedCorrection && selectedCorrection.id == correction.id"
          @handleClick="selectCorrection(correction, 'sm')"
        />
        <div v-if="!corrections.count">{{ $t('no_correction') }}</div>
      </section>
    </transition>

    <!-- show on bigger screen -->
    <transition name="slide">
      <section
        v-show="showCorrections"
        class="hidden md:block fixed right-0 min-h-screen bg-primary w-1/3 p-4 rounded-md"
        id="correction-list"
      >
        <CommonButton
          @handleClick="closeCorrections"
          size="xs"
          :name="$t('hide')"
          scheme="secondary"
          class="mb-3"
        />
        <CorrectionCard
          v-for="correction in corrections.results"
          :correction="correction"
          :key="correction.id"
          :selected="selectedCorrection && selectedCorrection.id == correction.id"
          @handleClick="selectCorrection(correction, 'md')"
        />
        <div v-if="!corrections.count">{{ $t('no_correction') }}</div>
      </section>
    </transition>
  </div>
</template>

<script>
import CorrectionCard from "~/components/correction/CorrectionCard.vue";
export default {
  components: {
    CorrectionCard,
  },
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

<i18n lang="yaml">
  en:
    no_correction: "No Corrections Yet"
    close: "Close"
    hide: "Hide"
  zh:
    no_correction: "还没有纠正"
    close: "关闭"
    hide: "隐藏"
</i18n>
