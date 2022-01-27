<template>
  <div class="flex justify-center">
    <div class="w-full mx-6 mt-3 md:mx-0 md:w-4/5 flex items-center" key="filter-btn">
      <button @click="$store.commit('setShowFilters')" class="flex items-center">
        <img class="w-6 md:mx-3" src="/filter.svg" />
        <span class="pl-2 md:p-0">{{ $t('filter') }}</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<i18n lang="yaml">
  en:
    filter: "Filter"
  zh:
    filter: "筛选"
</i18n>
