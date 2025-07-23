<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
const form = ref({
  email: '',
  password: '',
  name: '',
  username: '',
  password_confirmation: '',
})

const handleRegister = async () => {
  const response = await authStore.register(form.value)
  if (response.success) {
    window.showToast('Register Behasil', 'Registrasi berhasil silahkan login', 'success')
    router.push({ name: 'Login' })
  } else {
    window.showToast('Register Gagal', response.message, 'error')
  }
}
</script>

<template>
  <h1 class="text-4xl font-bold mb-1">LOGO</h1>
  <p class="mb-5">Register to your account</p>
  <form action="#" class="mb-5" @submit.prevent="handleRegister">
    <input
      v-model="form.email"
      type="text"
      placeholder="Email"
      class="input input-bordered w-full mb-2 border-sm"
      required
    />
    <input
      v-model="form.password"
      type="password"
      placeholder="Password"
      class="input input-bordered w-full mb-2 border-sm"
      required
    />
    <input
      v-model="form.password_confirmation"
      type="password"
      placeholder="Confirm Password"
      class="input input-bordered w-full mb-2 border-sm"
      required
    />
    <input
      v-model="form.name"
      type="text"
      placeholder="Your Name"
      class="input input-bordered w-full mb-2 border-sm"
      required
    />
    <input
      v-model="form.username"
      type="text"
      placeholder="Username"
      class="input input-bordered w-full mb-2 border-sm"
      required
    />

    <div class="bg-gray-100 p-4 rounded border border-gray-300 max-w-md mb-5">
      <p class="mb-2 font-semibold">Before creating an account, please note:</p>
      <ul class="list-disc list-inside mb-4 text-sm">
        <li><strong>Your name and Username</strong> will be publicly visible to other users.</li>
        <li>
          <strong>Your email address and password</strong> will be stored securely on our servers.
        </li>
      </ul>
      <p class="text-sm mb-4">
        We take your privacy and data security seriously. Your information will be encrypted and
        protected in accordance with industry standards.
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
    <p>Don't have an account?</p>
    <a href="#" class="text-primary ml-1 font-semibold" @click.prevent="$emit('toggle-auth')"
      >Login now</a
    >
  </div>
</template>
