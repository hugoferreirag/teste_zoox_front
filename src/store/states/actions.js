import api from '../../config/api'

export default {
  async getAllStates ({ commit }, payload) {
    console.log(process.env.VUE_APP_BASE_URL)
    commit('CLEAR_ERROR')
    try {
      const { data } = await api.post('/states/get', payload)
      commit('SET_STATES', data.items)
      commit('SET_TOTAL_PAGES', data.total)
    } catch (error) {
      commit('SET_ERROR', error.response.data)
    }
  },
  async filters ({ commit }, payload) {
    commit('CLEAR_ERROR')
    try {
      const { data } = await api.post('/states/filter', payload)
      commit('SET_STATES', data)
    } catch (error) {
      commit('SET_ERROR', error.response.data)
    }
  },
  async newState ({ commit }, payload) {
    commit('CLEAR_ERROR')
    commit('STATE_CREATED', false)
    try {
      await api.post('/states', payload)
      commit('STATE_CREATED', true)
    } catch (error) {
      commit('SET_ERROR', error.response.data)
    }
  },
  async updateState ({ commit }, payload) {
    commit('CLEAR_ERROR')
    commit('STATE_CREATED', false)
    const { id } = payload
    delete payload.id
    try {
      await api.put(`/states/${id}`, payload)
      commit('STATE_CREATED', true)
    } catch (error) {
      commit('SET_ERROR', error.response.data)
    }
  },
  async deleteState ({ commit }, payload) {
    commit('CLEAR_ERROR')
    commit('DELETE_SUCCESS', false)
    try {
      await api.delete(`/states/${payload}`)
      commit('DELETE_SUCCESS', true)
    } catch (error) {
      commit('SET_ERROR', error.response.data)
    }
  }
}
