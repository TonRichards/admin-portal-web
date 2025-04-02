<template>
  <div>
    <button
      @click="toggle"
      class="flex items-center justify-between px-4 py-2 w-full rounded hover:bg-blue-700 transition"
      :class="{ 'bg-blue-800': isAnyActive }"
    >
      <div class="flex items-center">
        <i :class="icon + ' text-lg mr-3'"></i>
        <span class="font-medium">{{ label }}</span>
      </div>
      <i :class="open ? 'mdi-chevron-down' : 'mdi-chevron-right'" class="text-sm" />
    </button>

    <div v-if="open" class="ml-6 mt-1 space-y-1">
      <router-link
        v-for="item in children"
        :key="item.to"
        :to="item.to"
        class="flex items-center px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
        :class="{ 'bg-blue-800': route.path === item.to }"
      >
        <i :class="item.icon + ' text-base mr-2'"></i>
        {{ item.label }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  icon: String,
  label: String,
  children: Array,
})

const route = useRoute()
const open = ref(false)

const toggle = () => (open.value = !open.value)

const isAnyActive = computed(() => props.children?.some((item) => route.path.startsWith(item.to)))

if (isAnyActive.value) open.value = true
</script>
