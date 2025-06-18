<template>
  <AdminLayout>
    <main class="flex-1 p-6 bg-gray-50 overflow-auto space-y-6">
      <div class="p-6 space-y-6 max-w-4xl mx-auto">
        <h1 class="text-2xl font-bold">Add User</h1>
        <UserForm ref="formRef" @submit="handleSubmit" />
      </div>
    </main>
  </AdminLayout>
</template>

<script setup>
  import UserForm from '@/components/user/UserForm.vue'
  import { createUser } from '@/services/userService'
  import { useRouter } from 'vue-router'
  import AdminLayout from '@/layouts/AdminLayout.vue'
  import { ref } from 'vue'

  const router = useRouter()

  const formRef = ref(null)

  const handleSubmit = async (payload) => {
    try {
      await createUser(payload)
      router.push('/users')
    } catch (err) {
      console.error('Create user failed:', err)
    }
  }
</script>
