import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
})

// Interceptor para incluir token JWT em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@bitStudent:token')
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  
  return config
})
