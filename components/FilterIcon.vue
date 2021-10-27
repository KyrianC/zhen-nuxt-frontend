<template>
  <div class="flex justify-center bg-primary">
    <div class="w-full mx-6 md:mx-0 md:w-4/5 flex items-center" key="filter-btn">
      <button>
        <img class="w-6 md:ml-3 mt-3" src="/filter.svg" @click="$store.commit('setShowFilters')" />
      </button>
    </div>
  </div>
</template>

<script>
export default {};
</script>
