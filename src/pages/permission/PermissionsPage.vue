<template>
  <AdminLayout>
    <!-- Content -->
    <main class="flex-1 p-6 bg-gray-50 overflow-auto space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">Permission List</h1>
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
      />
    </main>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { getPermissions} from '@/services/permissionService'

import AdminLayout from '@/layouts/AdminLayout.vue'
import PermissionTable from '@/components/permissions/PermissionTable.vue'

const permissions = ref([])
const pagination = ref(null)
const searchQuery = ref('')
const currentPage = ref(1)

const isLoading = ref(true)
const error = ref(null)

const fetchPermissions = async () => {
  try {
    isLoading.value = true
    const res = await getPermissions({
      page: currentPage.value,
      q: searchQuery.value,
    })
    permissions.value = res.data.data
    pagination.value = res.data.pagination
  } catch (err) {
    error.value = err.response?.data?.message || err.message
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchPermissions)

watch([searchQuery, currentPage], fetchPermissions)

</script>
