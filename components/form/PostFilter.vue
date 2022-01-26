<template>
  <div class="flex justify-center md:mx-3">
    <div
      class="bg-secondaryBackground p-4 w-full mx-6 my-3 flex flex-col flex-wrap md:w-4/5 relative"
    >
      <!-- TODO icon -->
      <span
        @click="$store.commit('setShowFilters', false)"
        class="absolute cursor-pointer right-2 top-1 text-lg"
      >X</span>
      <div class="flex flex-col md:flex-row md:items-center text-sm">
        <span class="font-bold underline">Level:</span>
        <MultipleSelect
          :choices="difficulties"
          name="difficulty"
          @select="
          $store.commit('updateFilters', {
            name: 'difficulty',
            value: $event
          })
        "
        />
      </div>
      <div class="flex flex-col md:flex-row md:items-center text-sm">
        <span class="font-bold underline">Language:</span>
        <MultipleSelect
          :choices="languages"
          name="language"
          @select="
          $store.commit('updateFilters', { name: 'language', value: $event })
        "
        />
      </div>
      <div class="flex flex-col md:flex-row md:items-center text-sm">
        <span class="font-bold underline">Correction:</span>
        <MultipleSelect
          :choices="{ true: 'Corrected only' }"
          name="corrected"
          @select="
          $store.commit('updateFilters', {
            name: 'corrected',
            value: $event
          })
        "
        />
      </div>
    </div>
  </div>
</template>

<script>
import languages from "@/static/languages";
import difficulties from "@/static/difficulties";
import MultipleSelect from "@/components/form/MultipleSelect";
export default {
  components: {
    MultipleSelect,
  },
  data() {
    return {
      languages,
      difficulties,
    };
  },
};
</script>

<style></style>
