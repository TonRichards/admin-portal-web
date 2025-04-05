<template>
  <div class="space-y-4">
    <div v-if="props.isLoading" class="text-center py-10 text-gray-500">Loading roles...</div>
    <div v-else-if="props.error" class="text-center text-red-500">{{ error }}</div>
    <div v-if="!props.isLoading && props.roles.length === 0" class="text-center py-8 text-gray-500">No roles found.</div>

    <div v-else class="overflow-auto rounded-xl shadow border bg-white">
      <table class="min-w-full text-sm text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-6 py-3">Name</th>
            <th class="px-6 py-3">Permissions</th>
            <th class="px-6 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 text-sm">
          <tr v-for="role in props.roles" :key="role.id" class="border-t hover:bg-gray-50">
            <td class="px-6 py-4 font-medium">{{ role.display_name }}</td>

            <td class="px-6 py-4">
              <div class="flex flex-wrap gap-2">
                <span v-if="role.name === 'superadmin'" class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                  All permissions
                </span>
                <span
                  v-else
                  v-for="permission in role.permissions"
                  :key="permission.name"
                  class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
                >
                  {{ permission.label_en }}
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
                @click="confirmDelete(role)"
              >
                Delete
              </button>
            </td>
          </tr>

          <!-- ถ้าไม่มีข้อมูล -->
          <tr v-if="props.roles.length === 0">
            <td colspan="3" class="px-6 py-4 text-center text-gray-400">
              No roles found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="flex justify-end items-center space-x-2 mt-4" v-if="props.pagination">
      <button
        :disabled="!props.pagination.prev_page_url"
        @click="goToPrev"
        class="px-3 py-1 rounded border bg-white hover:bg-gray-100"
      >
        Prev
      </button>

      <span>Page {{ props.pagination.current_page }} of {{ props.pagination.last_page }}</span>

      <button
        :disabled="!props.pagination.next_page_url"
        @click="goToNext"
        class="px-3 py-1 rounded border bg-white hover:bg-gray-100"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>

const editRole = (role) => {
  emit('edit', role)
}

const confirmDelete = (role) => {
  emit('delete', role)
}

const emit = defineEmits(['update:currentPage', 'edit', 'delete'])

const goToPrev = () => {
  if (props.pagination?.prev_page_url && props.currentPage > 1) {
    emit('update:currentPage', props.currentPage - 1)
  }
}

const goToNext = () => {
  if (props.pagination?.next_page_url && props.currentPage < props.pagination.last_page) {
    emit('update:currentPage', props.currentPage + 1)
  }
}

const props = defineProps({
  roles: Array,
  isLoading: Boolean,
  error: Object,
  pagination: Object,
  currentPage: Number
})
</script>
