import axios from 'axios'

const BASE_URL = '/api'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Hàng đợi các request thất bại trong lúc đang refresh token
let isRefreshing = false
let failedQueue = []

const processQueue = (error, token = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token)
  })
  failedQueue = []
}

const redirectToLogin = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('token_refreshed_at')
  window.location.href = '/login'
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config

    // Không phải 401 hoặc đã retry rồi → bỏ qua
    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error)
    }

    // Không có refresh token → về login ngay
    const refreshToken = localStorage.getItem('refresh_token')
    if (!refreshToken) {
      redirectToLogin()
      return Promise.reject(error)
    }

    // Đang refresh → đưa request vào hàng đợi, chờ token mới
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      })
        .then((token) => {
          original.headers.Authorization = `Bearer ${token}`
          return api(original)
        })
        .catch((err) => Promise.reject(err))
    }

    original._retry = true
    isRefreshing = true

    try {
      const res = await axios.post(`${BASE_URL}/auth/refresh-token`, null, {
        headers: { 'Refresh-Token': refreshToken },
      })
      const newToken = res.data.access_token
      localStorage.setItem('access_token', newToken)
      localStorage.setItem('token_refreshed_at', Date.now().toString())

      processQueue(null, newToken)
      original.headers.Authorization = `Bearer ${newToken}`
      return api(original)
    } catch (err) {
      processQueue(err, null)
      redirectToLogin()
      return Promise.reject(err)
    } finally {
      isRefreshing = false
    }
  }
)

export const authService = {
  login: (username, password) =>
    api.post('/auth/login', { username, password }),

  register: (username, email, password) =>
    api.post('/auth/register', { username, email, password }),

  getMe: () => api.get('/auth/me'),

  logout: () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('token_refreshed_at')
  },
}

export default api
