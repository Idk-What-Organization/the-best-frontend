<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'
import LoginComponent from '@/components/LoginComponent.vue'
import RegisterComponent from '@/components/RegisterComponent.vue'

const route = useRoute()
const router = useRouter()

const mode = computed<'login' | 'register'>(() =>
  route.name === 'Register' ? 'register' : 'login',
)

function toggleRoute() {
  if (mode.value === 'login') router.push({ name: 'Register' })
  else router.push({ name: 'Login' })
}
</script>

<template>
  <div class="flex h-screen items-center justify-center">
    <div
      class="bg-white rounded-lg shadow-lg flex overflow-hidden items-center justify-center gap-4"
    >
      <div>
        <img
          src="@/assets/842746760e7e0bcf832ec9bdb4a7887f1.png"
          alt="image"
          class="w-full h-auto object-cover"
        />
      </div>
      <div class="mr-5 relative overflow-hidden w-md">
        <component :is="mode === 'login' ? LoginComponent : RegisterComponent" @toggle-auth="toggleRoute" />
      </div>
    </div>
  </div>
</template>
