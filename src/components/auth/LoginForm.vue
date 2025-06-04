<template>
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
    <h2 class="text-2xl font-bold text-center text-blue-700 mb-6">Login</h2>
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

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  try {
    const response = await login({
      email: email.value,
      password: password.value,
    })

    const token = response.data.data.access_token
    const user = response.data.data.user

    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    router.push('/dashboard')
  } catch (err) {
    error.value = 'Invalid credentials'
  } finally {
    loading.value = false
  }
}
</script>
