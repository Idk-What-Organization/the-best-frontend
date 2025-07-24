<script setup lang="ts">
defineProps<{
  title: string
  type: 'success' | 'warning' | 'error'
  message: string
}>()
</script>

<template>
  <div :class="`flex bg-white/30 backdrop-blur-sm gap-2 h-24 mb-2 rounded-lg shadow-lg overflow-hidden`">
    <div :class="`bg-${type} w-2 h-24`"></div>
    <div class="flex flex-col justify-center">
      <p class="font-semibold capitalize">{{ title }}</p>
      <p>{{ message }}</p>
    </div>
  </div>
</template>
