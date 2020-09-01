export default {
  SET_ERROR (state, payload) {
    state.error = payload
  },
  SET_CITIES (state, payload) {
    state.cities = payload
  },
  CITIE_CREATED (state, payload) {
    state.successCreatedCitie = payload
  },
  CLEAR_ERROR (state) {
    state.error = null
  },
  DELETE_SUCCESS (state, payload) {
    state.deleteSuccess = payload
  },
  SET_TOTAL_PAGES (state, payload) {
    state.totalPages = payload
  }
}
