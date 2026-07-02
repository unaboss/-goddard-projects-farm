import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || 'Something went wrong. Please try again.'
    return Promise.reject({ message, status: error.response?.status })
  }
)

export default api
