export default {
  getCities (state) {
    return state.cities
  },
  getError (state) {
    return state.error
  },
  getSuccessCreateCitie (state) {
    return state.successCreatedCitie
  },
  getDeleteSuccess (state) {
    return state.deleteSuccess
  },
  getTotalPages (state) {
    return state.totalPages
  }
}
