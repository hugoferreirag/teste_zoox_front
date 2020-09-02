import Vue from 'vue'
import api from '../../config/api'

export default {
  async login ({ commit }, payload) {
    commit('CLEAR_ERROR')
    try {
      const { data } = await api.post('/auth', payload)
      localStorage.TOKEN = data.token
      const tokenDecoded = Vue.$jwt.decode(data.token)

      commit('SET_LOGIN', tokenDecoded)
    } catch (error) {
      commit('SET_ERROR', error)
    }
  },
  async newUser ({ commit }, payload) {
    commit('CLEAR_ERROR')
    commit('USER_CREATED', false)
    try {
      await api.post('/user', payload)
      commit('USER_CREATED', true)
    } catch (error) {
      commit('SET_ERROR', error.response.data)
    }
  },
  async updateUser ({ commit }, payload) {
    commit('CLEAR_ERROR')
    commit('CITIE_CREATED', false)
    const { id } = payload
    delete payload.id
    try {
      await api.put(`/user/${id}`, payload)
      commit('CITIE_CREATED', true)
    } catch (error) {
      commit('SET_ERROR', error.response.data)
    }
  },
  async deleteUser ({ commit }, payload) {
    commit('CLEAR_ERROR')
    commit('DELETE_SUCCESS', false)
    try {
      await api.delete(`/user/${payload}`)
      commit('DELETE_SUCCESS', true)
    } catch (error) {
      commit('SET_ERROR', error.response.data)
    }
  }
}
