<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { showToast } from '@/stores/toasts'

const authStore = useAuthStore()
const router = useRouter()

const form = ref({
  email: '',
  password: '',
  name: '',
  username: '',
  password_confirmation: '',
})
const errors = ref<{ [key: string]: string[] }>({})

// Validasi lokal
function validateRegisterForm(data: typeof form.value) {
  const newErrors: { [key: string]: string[] } = {}

  if (!data.name) {
    newErrors.name = ['Name required']
  }

  if (!data.username) {
    newErrors.username = ['Username required']
  }

  if (!data.email) {
    newErrors.email = ['Email required']
  } else if (!/^\S+@\S+\.\S+$/.test(data.email)) {
    newErrors.email = ['Format email not valid']
  }

  if (!data.password) {
    newErrors.password = ['Password required']
  } else if (data.password.length < 8) {
    newErrors.password = ['Password minimal 8 karakter']
  }

  if (!data.password_confirmation) {
    newErrors.password_confirmation = ['Confirm password required']
  } else if (data.password_confirmation !== data.password) {
    newErrors.password_confirmation = ['Confirm password not match']
  }

  return newErrors
}

const handleRegister = async () => {
  errors.value = validateRegisterForm(form.value)

  if (Object.keys(errors.value).length > 0) return

  const response = await authStore.register(form.value)

  if (response.success) {
    errors.value = {}
    showToast('Register Berhasil', 'Registrasi success, please login', 'success')
    router.push({ name: 'Login' })
  } else {
    errors.value = response.errors || {}
    showToast('Register Gagal', response.message, 'error')
  }
}
</script>

<template>
  <h1 class="text-4xl font-bold mb-1">LOGO</h1>
  <p class="mb-5">Register to your account</p>
  <form class="mb-5" @submit.prevent="handleRegister">
    <input
      v-model="form.email"
      type="text"
      placeholder="Email"
      class="input input-bordered w-full mb-2 border-sm"
      :class="{ 'input-error': errors.email }"
    />
    <p v-if="errors.email" class="text-red-500 text-sm mb-2">{{ errors.email[0] }}</p>

    <input
      v-model="form.password"
      type="password"
      placeholder="Password"
      class="input input-bordered w-full mb-2 border-sm"
      :class="{ 'input-error': errors.password }"
    />
    <p v-if="errors.password" class="text-red-500 text-sm mb-2">{{ errors.password[0] }}</p>

    <input
      v-model="form.password_confirmation"
      type="password"
      placeholder="Confirm Password"
      class="input input-bordered w-full mb-2 border-sm"
      :class="{ 'input-error': errors.password_confirmation }"
    />
    <p v-if="errors.password_confirmation" class="text-red-500 text-sm mb-2">
      {{ errors.password_confirmation[0] }}
    </p>

    <input
      v-model="form.name"
      type="text"
      placeholder="Your Name"
      class="input input-bordered w-full mb-2 border-sm"
      :class="{ 'input-error': errors.name }"
    />
    <p v-if="errors.name" class="text-red-500 text-sm mb-2">{{ errors.name[0] }}</p>

    <input
      v-model="form.username"
      type="text"
      placeholder="Username"
      class="input input-bordered w-full mb-2 border-sm"
      :class="{ 'input-error': errors.username }"
    />
    <p v-if="errors.username" class="text-red-500 text-sm mb-2">{{ errors.username[0] }}</p>

    <div class="bg-gray-100 p-4 rounded border border-gray-300 max-w-md mb-5">
      <p class="mb-2 font-semibold">Before creating an account, please note:</p>
      <ul class="list-disc list-inside mb-4 text-sm">
        <li><strong>Your name and Username</strong> will be publicly visible to other users.</li>
        <li><strong>Your email address and password</strong> will be stored securely on our servers.</li>
      </ul>
      <p class="text-sm mb-4">
        We take your privacy and data security seriously. Your information will be encrypted and protected in accordance with industry standards.
      </p>
      <label class="flex items-start gap-2 text-sm">
        <input type="checkbox" class="mt-1" required />
        <span>
          By creating an account, you agree to our
          <a href="#" class="text-blue-600 hover:underline">[Terms of Service]</a>
          and
          <a href="#" class="text-blue-600 hover:underline">[Privacy Policy]</a>.
        </span>
      </label>
    </div>

    <button type="submit" class="btn btn-primary w-full">Register</button>
  </form>

  <div class="flex items-center justify-center gap-2">
    <p>Already have an account?</p>
    <a href="#" class="text-primary ml-1 font-semibold" @click.prevent="$emit('toggle-auth')">
      Login now
    </a>
  </div>
</template>
