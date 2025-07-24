<script setup lang="ts">
import router from '@/router'
import { useAuthStore } from '@/stores/auth'
import { showToast } from '@/stores/toasts'
const authStore = useAuthStore()
const logout = () => {
  authStore.logout()
  showToast('Logout Behasil', 'Logout berhasil, selamat tinggal!', 'success')
  router.push({ name: 'Login' })
}
</script>
<template>
  <h1>Home</h1>
  <p>kamu melihat ini berati kamu berhasil login</p>
  <button @click="logout">Logout</button>
</template>
