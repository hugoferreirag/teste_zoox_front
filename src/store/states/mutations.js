export default {
  SET_ERROR (state, payload) {
    state.error = payload
  },
  SET_STATES (state, payload) {
    state.states = payload
  },
  STATE_CREATED (state, payload) {
    state.successCreatedState = payload
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
