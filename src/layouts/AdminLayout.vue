<template>
  <div class="flex min-h-screen bg-gray-100 text-gray-800">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <!-- Topbar (optional) -->
      <header class="bg-white shadow p-4 flex items-center justify-between">
        <h1 class="text-xl font-bold text-blue-700">
          {{ pageTitle }}
        </h1>

        <!-- User Dropdown -->
        <div ref="dropdown" class="relative">
          <button
            @click="toggleDropdown"
            class="flex items-center space-x-2 text-gray-800 hover:text-blue-700 focus:outline-none"
          >
            <img
              src="https://i.pravatar.cc/32?u=paulpogba"
              alt="Avatar"
              class="w-8 h-8 rounded-full"
            />
            <span class="hidden sm:inline">Paul Pogba</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2"
              viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <div
            v-if="dropdownOpen"
            class="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50"
          >
            <router-link
              :to="`/users/${user.id}`"
              class="block px-4 py-2 text-sm hover:bg-gray-100"
            >
              Profile
            </router-link>
            <button
              @click="logout"
              class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>

import { useAuthStore } from '@/stores/auth'
import Sidebar from '@/components/Sidebar.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'
import { useLogout } from '@/composables/auth/useLogout'

const auth = useAuthStore()
const user = computed(() => auth.user)

const { logout } = useLogout()

const route = useRoute()
const router = useRouter()

const dropdownOpen = ref(false)

const pageTitle = computed(() => {
  const path = route.path.replace('/', '').split('/')[0]
  return path.charAt(0).toUpperCase() + path.slice(1)
})

function handleClickOutside(event) {
  if (!event.target.closest('.relative')) {
    dropdownOpen.value = false
  }
}

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  const savedUser = localStorage.getItem('user')
  if (savedUser) {
    auth.setUser(JSON.parse(savedUser))
  }
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

</script>
