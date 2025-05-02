<template>
  <AdminLayout>
    <main class="flex-1 p-6 bg-gray-50 overflow-auto space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">Role List</h1>
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
          @click="openAddModal"
        >
          + Add Role
        </button>
      </div>

      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search roles..."
        class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
      />

      <RoleTable
        :roles="roles"
        :is-loading="isLoading"
        :error="error"
        :pagination="pagination"
        v-model:current-page="currentPage"
        @edit="editRole"
        @delete="confirmDelete"
      />
    </main>
  </AdminLayout>

  <AddRoleModal
    v-if="isAddModalOpen"
    :permissions="allPermissions"
    @close="isAddModalOpen = false"
    @saved="saveNewRole"
  />

  <EditRoleModal
    v-if="isEditModalOpen && allPermissions.length > 0 && selectedRole"
    :role="selectedRole"
    :permissions="allPermissions"
    @close="isEditModalOpen = false"
    @updated="updateRole"
  />

  <ConfirmDeleteModal
    v-if="isDeleteModalOpen"
    @cancel="isDeleteModalOpen = false"
    @confirm="deleteRole"
  />
</template>

<script setup>
  import { createRoleService, updateRoleService, deleteRoleService } from '@/features/role/services/roleService'
  import { ref, onMounted, watch } from 'vue'
  import axiosUser from '@/lib/axiosUser'
  import AdminLayout from '@/layouts/AdminLayout.vue'
  import RoleTable from '@/features/role/components/RoleTable.vue'
  import AddRoleModal from '@/features/role/components/AddRoleModal.vue'
  import EditRoleModal from '@/features/role/components/EditRoleModal.vue'
  import ConfirmDeleteModal from '@/features/role/components/ConfirmDeleteRoleModal.vue'

  const roles = ref([])
  const isAddModalOpen = ref(false)
  const allPermissions = ref([])

  const isEditModalOpen = ref(false)
  const selectedRole = ref(null)

  const isDeleteModalOpen = ref(false)
  const roleToDelete = ref(null)

  const itemsPerPage = 10
  const pagination = ref(null)

  const isLoading = ref(true)
  const error = ref(null)

  const searchQuery = ref('')
  const currentPage = ref(1)

  const fetchRoles = async () => {
    try {
      isLoading.value = true

      const applicationId = import.meta.env.VITE_APPLICATION_ID
      const response = await axiosUser.get('/roles', {
        params: {
          application_id: applicationId,
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
  const res = await axiosUser.get('/select/option/permissions')
    allPermissions.value = res.data.data.data
  }

  const openAddModal = () => {
    isAddModalOpen.value = true
    fetchAllPermissions()
  }

  const editRole = async (role) => {
    selectedRole.value = {
      id: role.id,
      name: role.name,
      display_name: role.display_name,
      permissions: role.permissions.map(p => typeof p === 'object' ? p.name : p),
    }

    await fetchAllPermissions()

    isEditModalOpen.value = true
  }

  const confirmDelete = (role) => {
    roleToDelete.value = role
    isDeleteModalOpen.value = true
  }

  const saveNewRole = async (payload) => {
    try {
      await createRoleService(payload)
      isAddModalOpen.value = false
      fetchRoles()
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    }
  }

  const updateRole = async (payload) => {
    try {
      await updateRoleService(payload.id, {
        name: payload.name,
        display_name: payload.display_name,
        permission_names: payload.permission_names,
      })
      isEditModalOpen.value = false
      fetchRoles()
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    }
  }

  const deleteRole = async () => {
    try {
      await deleteRoleService(roleToDelete.value.id)
      isDeleteModalOpen.value = false
      fetchRoles()
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    }
  }

  onMounted(fetchRoles)

  watch([searchQuery, currentPage], fetchRoles)

</script>
  