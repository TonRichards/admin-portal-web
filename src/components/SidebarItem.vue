<template>
  <router-link
    :to="to"
    class="flex items-center px-4 py-2 rounded hover:bg-blue-700 transition"
    :class="{ 'bg-blue-800': route.path === to }"
  >
    <component :is="icon" class="w-5 h-7 mr-3 inline-block align-middle relative top-[1px]" />

    <span class="font-medium align-middle">{{ label }}</span>
  </router-link>
</template>

<script setup>
import { useRoute } from 'vue-router'

defineProps({
  icon: [Object, Function],
  label: String,
  to: String,
})

const route = useRoute()
</script>
