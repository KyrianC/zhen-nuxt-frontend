<template>
  <div class="flex justify-center mt-3 md:mx-3">
    <div
      class="bg-secondaryBackground p-4 w-full mx-6 my-3 flex flex-col flex-wrap md:w-4/5 relative"
    >
      <div class="flex flex-col md:flex-row md:items-center text-sm">
        <span class="font-bold underline">{{ $t('level') }}:</span>
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
        <span class="font-bold underline">{{ $t('language') }}:</span>
        <MultipleSelect
          :choices="languages"
          name="language"
          @select="
          $store.commit('updateFilters', { name: 'language', value: $event })
        "
        />
      </div>
      <div class="flex flex-col md:flex-row md:items-center text-sm">
        <span class="font-bold underline">{{ $t('correction') }}:</span>
        <MultipleSelect
          :choices="{ true: $t('corrected_only')  }"
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


<i18n lang="yaml">
  #TODO translate languages and difficulties from imported files
  en:
    level: "Level"
    language: "Language"
    correction: "Correction"
    corrected_only: "Corrected only"
  zh:
    level: "水平"
    language: "语言"
    correction: "更正"
    corrected_only: "仅显示更正的"

</i18n>
