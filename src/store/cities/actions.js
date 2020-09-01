import api from '../../config/api'

export default {
  async getAllCities ({ commit }, payload) {
    commit('CLEAR_ERROR')
    try {
      const { data } = await api.post('/cities/get', payload)
      commit('SET_CITIES', data.items)
      commit('SET_TOTAL_PAGES', data.total)
    } catch (error) {
      commit('SET_ERROR', error)
    }
  },
  async filters ({ commit }, payload) {
    commit('CLEAR_ERROR')
    try {
      const { data } = await api.post('/cities/filter', payload)
      commit('SET_CITIES', data)
    } catch (error) {
      commit('SET_ERROR', error)
    }
  },
  async newCitie ({ commit }, payload) {
    commit('CLEAR_ERROR')
    commit('CITIE_CREATED', false)
    try {
      await api.post('/cities', payload)
      commit('CITIE_CREATED', true)
    } catch (error) {
      commit('SET_ERROR', error.response.data)
    }
  },
  async updateCitie ({ commit }, payload) {
    commit('CLEAR_ERROR')
    commit('CITIE_CREATED', false)
    const { id } = payload
    delete payload.id
    try {
      await api.put(`/cities/${id}`, payload)
      commit('CITIE_CREATED', true)
    } catch (error) {
      commit('SET_ERROR', error.response.data)
    }
  },
  async deleteCitie ({ commit }, payload) {
    commit('CLEAR_ERROR')
    commit('DELETE_SUCCESS', false)
    try {
      await api.delete(`/cities/${payload}`)
      commit('DELETE_SUCCESS', true)
    } catch (error) {
      commit('SET_ERROR', error.response.data)
    }
  }
}
