<template>
  <router-link
    :to="to"
    class="flex items-center px-4 py-2 rounded hover:bg-blue-700 transition"
    :class="{ 'bg-blue-800': route.path === to }"
  >
    <i :class="icon + ' text-lg mr-3'"></i>
    <span class="font-medium">{{ label }}</span>
  </router-link>
</template>

<script setup>
import { useRoute } from 'vue-router'

defineProps({
  icon: String,
  label: String,
  to: String,
})

const route = useRoute()
</script>
