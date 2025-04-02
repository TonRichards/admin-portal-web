<template>
  <div class="flex min-h-screen bg-gray-100 text-gray-800">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <!-- Topbar (optional) -->
      <header class="bg-white shadow p-4">
        <h1 class="text-xl font-bold text-blue-700">
          {{ pageTitle }}
        </h1>
      </header>

      <!-- Main Content -->
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import Sidebar from '@/components/Sidebar.vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const pageTitle = computed(() => {
  const path = route.path.replace('/', '').split('/')[0]
  return path.charAt(0).toUpperCase() + path.slice(1)
})
</script>
