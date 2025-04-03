<template>
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

  <div class="flex h-screen">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Content -->
    <main class="flex-1 p-6 bg-gray-50 overflow-auto">
      <RoleTable
        :roles="roles"
        @edit="editRole"
        @delete="confirmDelete"
        @add="openAddModal"
      />
    </main>
  </div>
</template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue'
  import axiosUser from '@/lib/axiosUser'
  import Sidebar from '@/components/Sidebar.vue'
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
      await axiosUser.post('/roles', payload)
      isAddModalOpen.value = false
      fetchRoles()
    } catch (err) {
      alert(err.response?.data?.message || err.message)
    }
  }

  const updateRole = async (payload) => {
    try {
      await axiosUser.put(`/roles/${payload.id}`, {
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
      await axiosUser.delete(`/roles/${roleToDelete.value.id}`)
      isDeleteModalOpen.value = false
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
</script>
  