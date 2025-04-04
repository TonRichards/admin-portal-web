<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Content -->
    <main class="flex-1 p-6 bg-gray-50 overflow-auto space-y-6">
      <!-- Header + Add -->
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">Permission List</h1>
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
          @click="openAddModal"
        >
          + Add Permission
        </button>
      </div>

      <!-- Search -->
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search permissions..."
        class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
      />

      <!-- Table -->
      <PermissionTable
        v-model:current-page="currentPage"
        :permissions="permissions"
        :pagination="pagination"
        :is-loading="isLoading"
        :error="error"
        @edit="editPermission"
        @delete="confirmDelete"
      />

      <!-- Modals -->
      <AddPermissionModal
        v-if="isAddModalOpen"
        @close="isAddModalOpen = false"
        @saved="savePermission"
      />

      <!-- <EditPermissionModal
        v-if="isEditModalOpen"
        :permission="selectedPermission"
        @close="isEditModalOpen = false"
        @updated="fetchPermissions"
      />

      <ConfirmDeleteModal
        v-if="isDeleteModalOpen"
        @cancel="isDeleteModalOpen = false"
        @confirm="deletePermission"
      /> -->
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import axiosUser from '@/lib/axiosUser'
import Sidebar from '@/components/Sidebar.vue'
import PermissionTable from '@/features/permission/components/PermissionTable.vue'
import AddPermissionModal from '@/features/permission/components/AddPermissionModal.vue'
// import EditPermissionModal from '@/features/permission/components/EditPermissionModal.vue'
// import ConfirmDeleteModal from '@/features/permission/components/ConfirmDeletePermissionModal.vue'

const permissions = ref([])
const pagination = ref(null)
const searchQuery = ref('')
const currentPage = ref(1)

const isAddModalOpen = ref(false)
const isEditModalOpen = ref(false)
const selectedPermission = ref(null)
const isDeleteModalOpen = ref(false)
const permissionToDelete = ref(null)

const isLoading = ref(true)
const error = ref(null)

const fetchPermissions = async () => {
  try {
    isLoading.value = true
    const res = await axiosUser.get('/permissions', {
      params: {
        page: currentPage.value,
        q: searchQuery.value,
      },
    })
    permissions.value = res.data.data
    pagination.value = res.data.pagination
  } catch (err) {
    error.value = err.response?.data?.message || err.message
  } finally {
    isLoading.value = false
  }
}

const savePermission = async (payload) => {
  try {
    await axiosUser.post('/permissions', payload)
    isAddModalOpen.value = false
    fetchPermissions()
  } catch (err) {
    alert(err.response?.data?.message || err.message)
  }
}

onMounted(fetchPermissions)

watch([searchQuery, currentPage], fetchPermissions)

const openAddModal = () => {
  isAddModalOpen.value = true
}

const editPermission = (permission) => {
  selectedPermission.value = permission
  isEditModalOpen.value = true
}

const confirmDelete = (permission) => {
  permissionToDelete.value = permission
  isDeleteModalOpen.value = true
}

const deletePermission = async () => {
  await axiosUser.delete(`/permissions/${permissionToDelete.value.id}`)
  isDeleteModalOpen.value = false
  fetchPermissions()
}
</script>
