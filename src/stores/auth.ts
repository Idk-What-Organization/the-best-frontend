import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const register = async (data: any) => {
    try {
      const response = await axios.post('http://localhost:8000/api/register', data)
      return { success: true, message: response.data.message, errors: {} }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Register gagal',
        errors: error.response?.data?.errors || {},
      }
    }
  }
  const login = async (data: any) => {
    try {
      const response = await axios.post('http://localhost:8000/api/login', data)
      localStorage.setItem('token', response.data.access_token)
      return { success: true, message: response.data.message, errors: {} }
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login gagal',
        errors: error.response?.data?.errors || {},
      }
    }
  }
  const logout = () => {
    localStorage.removeItem('token')
    return { success: true, message: 'Logout berhasil', errors: {} }
  }
  return {
    register,
    login,
    logout,
  }
})
