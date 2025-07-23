import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const register = async (data: any) => {
    try {
      const response = await axios.post('http://localhost:8000/api/register', data)
      return { success: true, message: response.data.message }
    } catch (error: any) {
      return {
        success: false,
        message: error.response.data.message || 'Something went wrong',
      }
    }
  }
  return {
    register,
  }
})
