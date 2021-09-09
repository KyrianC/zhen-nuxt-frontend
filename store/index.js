export const state = () => ({
  filters: {
    difficulty: [],
    language: [],
    ordering: ["-created"],
    corrected: []
  },
  showFilters: false

})

export const mutations = {
  updateFilters(state, payload) {
    state.filters[payload.name] = [...payload.value]
  },
  setShowFilters(state) {
    state.showFilters = !state.showFilters
  }
}
