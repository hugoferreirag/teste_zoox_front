export default {
  getStates (state) {
    return state.states
  },
  getError (state) {
    return state.error
  },
  getSuccessCreateState (state) {
    return state.successCreatedState
  },
  getDeleteSuccess (state) {
    return state.deleteSuccess
  },
  getTotalPages (state) {
    return state.totalPages
  }
}
