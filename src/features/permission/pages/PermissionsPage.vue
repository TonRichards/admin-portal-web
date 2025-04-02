<template>
  <AdminLayout>
    <h1 class="text-2xl font-bold text-blue-700 mb-6">Permissions</h1>

    <div class="flex justify-end mb-4">
      <button
        class="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded shadow"
        @click="createPermission"
      >
        + Create Permission
      </button>
    </div>

    <PermissionTable
      :permissions="permissions"
      :loading="loading"
      @edit="handleEdit"
      @delete="handleDelete"
    />
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '@/layouts/AdminLayout.vue'
import PermissionTable from '@/features/permission/components/PermissionTable.vue'
import { ref, onMounted } from 'vue'
import apiUser from '@/lib/axiosUser'

const permissions = ref([])
const loading = ref(false)

const fetchPermissions = async () => {
  loading.value = true
  try {
    const res = await apiUser.get('/permissions')
    permissions.value = res.data.data || res.data
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

onMounted(fetchPermissions)

const createPermission = () => alert('TODO: create modal')
const handleEdit = (perm) => alert('Edit ' + perm.name)
const handleDelete = async (perm) => {
  if (confirm(`Delete ${perm.name}?`)) {
    await api.delete(`/permissions/${perm.id}`)
    await fetchPermissions()
  }
}
</script>
