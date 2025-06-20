<template>
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
    <h2 class="text-2xl font-bold text-center text-blue-700 mb-6">สมัครสมาชิก</h2>
    <form @submit.prevent="handleLogin">
      <input
        v-model="name"
        type="text"
        placeholder="Name"
        required
        class="w-full p-3 border border-gray-300 rounded mb-4"
      />
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
      <input
        v-model="password_confirmation"
        type="password"
        placeholder="Password Confirmation"
        required
        class="w-full p-3 border border-gray-300 rounded mb-4"
      />
      <button
        :disabled="loading"
        class="w-full p-3 bg-blue-600 text-white rounded hover:bg-yellow-500 transition"
      >
        {{ loading ? 'กำลังตรวจสอบข้อมูล...' : 'สมัครสมาชิกสำเร็จ' }}
      </button>
      <p class="text-red-500 mt-2" v-if="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { register } from '@/services/authService'

const name = ref('')
const email = ref('')
const password = ref('')
const password_confirmation = ref('')
const loading = ref(false)
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
  error.value = ''
  loading.value = true
  try {
    const response = await register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: password_confirmation.value,
      application_id: import.meta.env.VITE_APPLICATION_ID,
    })

    const token = response.data.data.access_token

    localStorage.setItem('token', token)
    router.push('/login')
  } catch (error) {
    error.value = 'Invalid credentials'
  } finally {
    loading.value = false
  }
}
</script>
