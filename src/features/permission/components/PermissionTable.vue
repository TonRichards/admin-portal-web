<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Permission List</h1>
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
        @click="addPermission"
      >
        + Add Permission
      </button>
    </div>

    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search permissions..."
      class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
    />

    <div v-if="isLoading" class="text-center py-10 text-gray-500">Loading permissions...</div>
    <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
    <div v-if="!isLoading && permissions.length === 0" class="text-center py-8 text-gray-500">No permissions found.</div>

    <div v-else class="overflow-auto rounded-xl shadow border bg-white">
      <table class="min-w-full text-sm text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Display Name</th>
            <th class="px-4 py-2">Description</th>
            <th class="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="permission in permissions"
            :key="permission.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="px-4 py-2">{{ permission.name }}</td>
            <td class="px-4 py-2">{{ permission.label_en }}</td>
            <td class="px-4 py-2">{{ permission.description_en }}</td>
            <td class="px-4 py-2 space-x-2">
              <button @click="editPermission(permission)" class="text-blue-600 hover:underline">Edit</button>
              <button @click="deletePermission(permission.id)" class="text-red-600 hover:underline">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-end items-center space-x-2 mt-4" v-if="pagination">
      <button
        :disabled="!pagination.prev_page_url"
        @click="currentPage--"
        class="px-3 py-1 rounded border bg-white hover:bg-gray-100"
      >
        Prev
      </button>

      <span>Page {{ pagination.current_page }} of {{ pagination.last_page }}</span>

      <button
        :disabled="!pagination.next_page_url"
        @click="currentPage++"
        class="px-3 py-1 rounded border bg-white hover:bg-gray-100"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import axiosUser from '@/lib/axiosUser'

const permissions = ref([])
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 10
const pagination = ref(null)

const isLoading = ref(true)
const error = ref(null)

const fetchPermissions = async () => {
  try {
    isLoading.value = true
    const response = await axiosUser.get('/permissions', {
      params: {
        page: currentPage.value,
        per_page: itemsPerPage,
        q: searchQuery.value,
      },
    })
    permissions.value = response.data.data
    pagination.value = response.data.pagination

  } catch (err) {
    error.value = err.response?.data?.message || err.message
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchPermissions()
})

watch(currentPage, () => {
  fetchPermissions()
})

let searchTimeout
watch(searchQuery, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    fetchPermissions()
  }, 300)
})

const addPermission = () => alert('Add new permission')
const editPermission = (p) => alert(`Edit: ${p.name}`)
const deletePermission = (id) => {
  if (confirm('Delete this permission?')) {
    permissions.value = permissions.value.filter(p => p.id !== id)
  }
}
</script>
