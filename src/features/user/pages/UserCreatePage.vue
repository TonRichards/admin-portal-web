<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Content -->
    <main class="flex-1 p-6 bg-gray-50 overflow-auto space-y-6">
      <div class="p-6 space-y-6 max-w-4xl mx-auto">
        <h1 class="text-2xl font-bold">Add User</h1>
        <UserForm @submit="handleSubmit" />
      </div>
    </main>
  </div>
</template>
  
  <script setup>
  import UserForm from '@/features/user/components/UserForm.vue'
  import { createUser } from '@/features/user/services/userService'
  import { useRouter } from 'vue-router'
  import Sidebar from '@/components/Sidebar.vue'
  
  const router = useRouter()
  
  const handleSubmit = async (payload) => {
    try {
      await createUser(payload)
      router.push('/users')
    } catch (err) {
      console.error('Create user failed:', err)
    }
  }
  </script>
  