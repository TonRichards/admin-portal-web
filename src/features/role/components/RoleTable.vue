<template>
  <div class="space-y-4">
    <AddRoleModal
      v-if="isAddModalOpen"
      :permissions="allPermissions"
      @close="isAddModalOpen = false"
      @saved="saveNewRole"
    />
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Role List</h1>
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
        @click="addRole"
      >
        + Add Role
      </button>
    </div>

    <!-- Search -->
    <input
      type="text"
      placeholder="Search roles..."
      class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
    />

    <!-- Table -->
    <div class="overflow-auto rounded-xl shadow border bg-white">
      <table class="min-w-full text-sm text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-6 py-3">Name</th>
            <th class="px-6 py-3">Permissions</th>
            <th class="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 text-sm">
          <tr v-for="role in roles" :key="role.id" class="border-t hover:bg-gray-50">
            <td class="px-6 py-4 font-medium">{{ role.display_name }}</td>

            <td class="px-6 py-4">
              <div class="flex flex-wrap gap-2">
                <span v-if="role.name === 'superadmin'" class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  All permissions
                </span>
                <span
                  v-else
                  v-for="permission in role.permissions"
                  :key="permission"
                  class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                >
                  {{ permission }}
                </span>
              </div>
            </td>

            <td class="px-6 py-4 text-center space-x-2">
              <button
                class="text-blue-600 hover:underline text-sm"
                @click="editRole(role)"
              >
                Edit
              </button>
              <button
                class="text-red-600 hover:underline text-sm"
                @click="deleteRole(role)"
              >
                Delete
              </button>
            </td>
          </tr>

          <!-- ถ้าไม่มีข้อมูล -->
          <tr v-if="roles.length === 0">
            <td colspan="3" class="px-6 py-4 text-center text-gray-400">
              No roles found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axiosUser from '@/lib/axiosUser'
import AddRoleModal from '@/features/role/components/AddRoleModal.vue'

const roles = ref([])
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 10
const pagination = ref(null)

const isLoading = ref(true)
const error = ref(null)

const isAddModalOpen = ref(false)
const allPermissions = ref([])

const fetchRoles = async () => {
  try {
    isLoading.value = true
    const response = await axiosUser.get('/roles', {
      params: {
        page: currentPage.value,
        per_page: itemsPerPage,
        q: searchQuery.value,
      },
    })
    roles.value = response.data.data
    pagination.value = response.data.pagination

  } catch (err) {
    error.value = err.response?.data?.message || err.message
  } finally {
    isLoading.value = false
  }
}

const fetchAllPermissions = async () => {
  const res = await axiosUser.get('/permissions?per_page=100')
  allPermissions.value = res.data.data
}

const saveNewRole = async (payload) => {
  try {
    await axiosUser.post('/roles', payload)
    isAddModalOpen.value = false
    fetchRoles()
  } catch (err) {
    alert(err.response?.data?.message || err.message)
  }
}

onMounted(() => {
  fetchRoles()
})

watch(currentPage, () => {
  fetchRoles()
})

let searchTimeout
watch(searchQuery, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    fetchRoles()
  }, 300)
})

const addRole = () => {
  isAddModalOpen.value = true
  fetchAllPermissions()
}
const editRole = (p) => alert(`Edit: ${p.name}`)
const deleteRole = (id) => {
  if (confirm('Delete this role?')) {
    roles.value = roles.value.filter(p => p.id !== id)
  }
}
</script>
