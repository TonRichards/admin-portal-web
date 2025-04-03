<template>
  <div>
    <button
      @click="toggle"
      class="flex items-center justify-between px-4 py-2 w-full rounded hover:bg-blue-700 transition"
      :class="{ 'bg-blue-800': isAnyActive }"
    >
      <div class="flex items-center">
        <component :is="icon" class="w-5 h-7 mr-3 inline-block align-middle relative top-[1px]" />
        <span class="font-medium">{{ label }}</span>
      </div>
      <component :is="open ? ChevronDownIcon : ChevronRightIcon" class="w-4 h-4" />
    </button>

    <div v-if="open" class="ml-6 mt-1 space-y-1">
      <router-link
        v-for="item in children"
        :key="item.to"
        :to="item.to"
        class="flex items-center px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
        :class="{ 'bg-blue-800': route.path === item.to }"
      >
        <component :is="item.icon" class="w-5 h-7 mr-3" />
        {{ item.label }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue'
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue'

const props = defineProps({
  icon: [Object, Function],
  label: String,
  children: Array,
})

const route = useRoute()
const open = ref(false)

const toggle = () => (open.value = !open.value)

const isAnyActive = computed(() => props.children?.some((item) => route.path.startsWith(item.to)))

if (isAnyActive.value) open.value = true
</script>
