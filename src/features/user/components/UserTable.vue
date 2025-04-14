<template>
  <div class="space-y-4">
    <div v-if="props.isLoading" class="text-center py-10 text-gray-500">Loading users...</div>
    <div v-else-if="props.error" class="text-center text-red-500">{{ error }}</div>
    <div v-if="!props.isLoading && props.users.length === 0" class="text-center py-8 text-gray-500">No users found.</div>

    <div v-else class="overflow-auto rounded-xl shadow border bg-white">
      <table class="min-w-full text-sm text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-6 py-3">ชื่อ</th>
            <th class="px-6 py-3">อีเมล์</th>
            <th class="px-6 py-3 text-center">บริษัท</th>
            <th class="px-6 py-3 text-center">สิทธิ์</th>
            <th class="px-6 py-3 text-center">การจัดการ</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 text-sm">
          <tr v-for="user in props.users" :key="user.id" class="border-t hover:bg-gray-50">
            <td class="px-6 py-4 font-medium">{{ user.name }}</td>
            <td class="px-6 py-4 font-medium">{{ user.email }}</td>
            <td class="px-6 py-4 font-medium">{{ user.display_name }}</td>
            <td class="px-6 py-4 font-medium">{{ user.display_name }}</td>

            <td class="px-6 py-4 text-center space-x-2">
              <button
                class="text-blue-600 hover:underline text-sm"
                @click="editUser(user)"
              >
                Edit
              </button>
              <button
                class="text-red-600 hover:underline text-sm"
                @click="confirmDelete(user)"
              >
                Delete
              </button>
            </td>
          </tr>

          <!-- ถ้าไม่มีข้อมูล -->
          <tr v-if="props.users.length === 0">
            <td colspan="3" class="px-6 py-4 text-center text-gray-400">
              No users found.
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

const editUser = (user) => {
  emit('edit', user)
}

const confirmDelete = (user) => {
  emit('delete', user)
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
  users: Array,
  isLoading: Boolean,
  error: Object,
  pagination: Object,
  currentPage: Number
})
</script>
