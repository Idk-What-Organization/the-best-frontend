import { ref } from 'vue'

interface ToastItem {
  id: number
  title: string
  message: string
  type: 'success' | 'error' | 'warning'
  duration: number
}

export const activeToasts = ref<ToastItem[]>([])
const queueToasts = ref<ToastItem[]>([])

let toastId = 0
const MAX_TOASTS = 5

export function showToast(
  title: string,
  message: string,
  type: 'success' | 'error' | 'warning' = 'success',
  duration = 3000,
) {
  const id = ++toastId
  const newToast: ToastItem = { id, title, message, type, duration }

  if (activeToasts.value.length < MAX_TOASTS) {
    addToast(newToast)
  } else {
    queueToasts.value.push(newToast)
  }
}

function addToast(toast: ToastItem) {
  activeToasts.value.push(toast)

  setTimeout(() => {
    removeToast(toast.id)

    // Jika ada toast di queue, tampilkan
    if (queueToasts.value.length > 0) {
      const next = queueToasts.value.shift()
      if (next) addToast(next)
    }
  }, toast.duration)
}

function removeToast(id: number) {
  activeToasts.value = activeToasts.value.filter((t) => t.id !== id)
}
