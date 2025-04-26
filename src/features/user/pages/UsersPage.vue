<template>
  <AdminLayout>
    <main class="flex-1 p-6 bg-gray-50 overflow-auto space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">User List</h1>
        <router-link to="/users/create">
          <button
            class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
          >
            + Add User
          </button>
        </router-link>
      </div>
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search roles..."
        class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
      />
      <UserTable
        :users="users"
        :is-loading="isLoading"
        :error="error"
        :pagination="pagination"
        v-model:current-page="currentPage"
        @delete="openDeleteModal"
      />
      <ConfirmDeleteUserModal
        v-if="isDeleteModalOpen"
        @cancel="isDeleteModalOpen = false"
        @confirm="handleDelete"
      />
    </main>
  </AdminLayout>
</template>
  
<script setup>
  import { ref, onMounted, watch } from 'vue'
  import { getUsers, deleteUser } from '@/features/user/services/userService'
  import AdminLayout from '@/layouts/AdminLayout.vue'
  import UserTable from '@/features/user/components/UserTable.vue'
  import ConfirmDeleteUserModal from '@/features/user/components/ConfirmDeleteUserModal.vue'

  const users = ref([])

  const isDeleteModalOpen = ref(false)
  const userToDelete = ref(null)

  const itemsPerPage = 10
  const pagination = ref(null)

  const isLoading = ref(true)
  const error = ref(null)

  const searchQuery = ref('')
  const currentPage = ref(1)

  const fetchUsers = async () => {
    try {
      isLoading.value = true
      const response = await getUsers({
        params: {
          page: currentPage.value,
          per_page: itemsPerPage,
          q: searchQuery.value,
        },
      })
      users.value = response.data.data
      pagination.value = response.data.pagination

    } catch (err) {
      error.value = err.response?.data?.message || err.message
    } finally {
      isLoading.value = false
    }
  }

  const openDeleteModal = (user) => {
    userToDelete.value = user
    isDeleteModalOpen.value = true
  }

  const handleDelete = async () => {
    try {
      await deleteUser(`${userToDelete.value.id}`)
      isDeleteModalOpen.value = false
      fetchUsers()
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    }
  }

  onMounted(fetchUsers)

  watch([searchQuery, currentPage], fetchUsers)

</script>
  