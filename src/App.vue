<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { activeToasts, showToast } from '@/stores/toasts'
import ToastComponent from '@/components/Toast/ToastComponent.vue'

const isMobile = ref(false)

onMounted(() => {
  const checkMobile = () => {
    isMobile.value = window.innerWidth < 768
  }
  ;(window as any).showToast = showToast
  checkMobile()
  window.addEventListener('resize', checkMobile)
})
</script>

<template>
  <div>
    <!-- Blocker Mobile -->
    <div
      v-if="isMobile"
      class="fixed inset-0 z-50 bg-white/30 backdrop-blur-sm flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded shadow text-center max-w-sm">
        <h2 class="text-xl font-bold mb-2">Coming Soon</h2>
        <p class="text-sm text-gray-700">This doesn't work on mobile devices.</p>
      </div>
    </div>

    <!-- Normal App -->
    <div v-else>
      <RouterView />
    </div>
    <div id="toast-container" class="fixed bottom-4 right-4 w-80 overflow-hidden">
      <TransitionGroup name="toast" tag="div">
        <ToastComponent
          v-for="toast in activeToasts"
          :title="toast.title"
          :key="toast.id"
          :message="toast.message"
          :type="toast.type"
        />
      </TransitionGroup>
    </div>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(310px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(310px);
}
</style>
