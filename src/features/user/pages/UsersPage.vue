<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Content -->
    <main class="flex-1 p-6 bg-gray-50 overflow-auto space-y-6">
      <!-- Header -->
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

      <!-- Search -->
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
          @edit="editUser"
          @delete="confirmDelete"
        />
      </main>
  </div>
</template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import { getUsers } from '@/features/user/services/userService'
  import Sidebar from '@/components/Sidebar.vue'
  import UserTable from '@/features/user/components/UserTable.vue'

  const users = ref([])

  const isEditModalOpen = ref(false)

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

  const editUser = async (user) => {
    selectedRole.value = {
      id: user.id,
      name: user.name,
      email: user.email,
    }

    await fetchUsers()

    isEditModalOpen.value = true
  }

  const confirmDelete = (role) => {
    userToDelete.value = role
    isDeleteModalOpen.value = true
  }

  onMounted(fetchUsers)

  watch([searchQuery, currentPage], fetchUsers)

</script>
  