import Vue from 'vue'
import api from '../../config/api'

export default {
  async login ({ commit }, payload) {
    commit('CLEAR_ERROR')
    try {
      const { data } = await api.post('/auth', payload)
      localStorage.TOKEN = data.token
      const tokenDecoded = Vue.$jwt.decode(data.token)
      api.defaults.headers.Authorization = `Bearer ${localStorage.TOKEN}`

      commit('SET_LOGIN', tokenDecoded)
    } catch (error) {
      commit('SET_ERROR', error.response.data)
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
  async updatePass ({ commit }, payload) {
    commit('CLEAR_ERROR')
    commit('PASS_UPDATE', false)
    const tokenDecoded = Vue.$jwt.decode(localStorage.TOKEN)
    try {
      await api.put(`/user/${tokenDecoded.id}`, { password: payload })
      commit('PASS_UPDATE', true)
    } catch (error) {
      commit('SET_ERROR', error.response.data)
    }
  },
  async deleteUser ({ commit }, payload) {
    commit('CLEAR_ERROR')
    commit('DELETE_SUCCESS', false)
    try {
      const tokenDecoded = Vue.$jwt.decode(localStorage.TOKEN)
      await api.delete(`/user/${tokenDecoded.id}`)
      commit('DELETE_SUCCESS', true)
    } catch (error) {
      commit('SET_ERROR', error.response.data)
    }
  }
}
