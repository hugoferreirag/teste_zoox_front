export default {
  SET_ERROR (state, payload) {
    state.error = payload
  },
  SET_LOGIN (state, payload) {
    state.login = payload
  },
  USER_CREATED (state, payload) {
    state.createdUser = payload
  },
  CLEAR_ERROR (state) {
    state.error = null
  },
  DELETE_SUCCESS (state, payload) {
    state.deleteSuccess = payload
  }
}
