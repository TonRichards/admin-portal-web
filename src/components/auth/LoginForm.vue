<template>
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
    <h2 class="text-2xl font-bold text-center text-blue-700 mb-6">Login เข้าสู่ระบบ</h2>
    <form @submit.prevent="handleLogin">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
        class="w-full p-3 border border-gray-300 rounded mb-4"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
        class="w-full p-3 border border-gray-300 rounded mb-4"
      />
      <button
        :disabled="loading"
        class="w-full p-3 bg-blue-600 text-white rounded hover:bg-yellow-500 transition"
      >
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>
      <p class="text-red-500 mt-2" v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/authService'
import { useAuthStore } from '@/stores/authStore'
import { useOrganizationStore } from '@/stores/organizationStore'

import { jwtDecode } from 'jwt-decode'

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const router = useRouter()

const auth = useAuthStore()
const orgStore = useOrganizationStore()

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  try {
    const response = await login({
      email: email.value,
      password: password.value,
    })

    const data = response.data.data

    const decoded = jwtDecode(data.access_token)

    const user = {
      ...data.user,
      current_organization_id: decoded.current_organization_id,
      current_organization_name: decoded.current_organization_name,
      organizations: decoded.organizations,
    }

    auth.setTokens(data.access_token, data.refresh_token)
    auth.setUser(user)

    orgStore.init()

    router.push('/dashboard')
  } catch (error) {
    error.value = 'Invalid credentials'
  } finally {
    loading.value = false
  }
}
</script>
