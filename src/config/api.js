import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL || 'http://localhost:3000',
  headers: {
    'Cache-Control': 'no-cache',
    'Content-type': 'application/json',
    Authorization: `Bearer ${localStorage.TOKEN ? localStorage.TOKEN : ''}`
  }
})

export default api
