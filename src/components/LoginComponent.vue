<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { showToast } from '@/stores/toasts'

// Store & router
const authStore = useAuthStore()
const router = useRouter()

// Form dan error
const form = ref({
  identity: '',
  password: '',
})
const errors = ref<{ [key: string]: string[] }>({})

// Fungsi validasi client-side
function validateLoginForm(data: typeof form.value) {
  const newErrors: { [key: string]: string[] } = {}

  if (!data.identity) {
    newErrors.identity = ['Username required']
  }

  if (!data.password) {
    newErrors.password = ['Password required']
  } else if (data.password.length < 8) {
    newErrors.password = ['Password minimal 8 karakter.']
  }

  return newErrors
}

// Handler login
const handleLogin = async () => {
  // Validasi lokal
  errors.value = validateLoginForm(form.value)
  if (Object.keys(errors.value).length > 0) {
    return
  }

  // Kirim ke server
  const response = await authStore.login(form.value)

  if (response.success) {
    errors.value = {}
    showToast('Login Berhasil', 'Login berhasil', 'success')
    router.push({ name: 'Home' })
  } else {
    errors.value = response.errors || {}
    showToast('Login Gagal', response.message, 'error')
  }
}
</script>

<template>
  <h1 class="text-4xl font-bold mb-1">LOGO</h1>
  <p class="mb-5">Login to your account</p>

  <form @submit.prevent="handleLogin" class="mb-5">
    <input
      v-model="form.identity"
      type="text"
      placeholder="Username or Email"
      class="input input-bordered w-full mb-2 border-sm"
      :class="{ 'input-error': errors.identity }"
    />
    <p v-if="errors.identity" class="text-red-500 text-sm mb-2">
      {{ errors.identity[0] }}
    </p>

    <input
      v-model="form.password"
      type="password"
      placeholder="Password"
      class="input input-bordered w-full mb-2 border-sm"
      :class="{ 'input-error': errors.password }"
    />
    <p v-if="errors.password" class="text-red-500 text-sm mb-2">
      {{ errors.password[0] }}
    </p>

    <button type="submit" class="btn btn-primary w-full">Login</button>
  </form>

  <div class="flex items-center gap-2 mb-5">
    <hr class="flex-1 border-gray-400" />
    <span class="text-gray-600">Or</span>
    <hr class="flex-1 border-gray-400" />
  </div>

  <div class="flex items-center justify-center gap-2">
    <p>Don't have an account?</p>
    <a href="#" class="text-primary ml-1 font-semibold" @click.prevent="$emit('toggle-auth')">
      Register now
    </a>
  </div>
</template>
