<template>
  <div class="space-y-4">
    <div v-if="props.isLoading" class="text-center py-10 text-gray-500">Loading permissions...</div>
    <div v-else-if="props.error" class="text-center text-red-500">{{ error }}</div>
    <div v-else-if="!props.isLoading && props.permissions.length === 0" class="text-center py-8 text-gray-500">No permissions found.</div>

    <div v-else class="overflow-auto rounded-xl shadow border bg-white">
      <table class="min-w-full text-sm text-left">
        <thead class="bg-gray-100">
          <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Display Name</th>
            <th class="px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="permission in props.permissions"
            :key="permission.id"
            class="border-t hover:bg-gray-50"
          >
            <td class="px-4 py-2">{{ permission.name }}</td>
            <td class="px-4 py-2">{{ permission.label_th }}</td>
            <td class="px-4 py-2">{{ permission.description_th }}</td>
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

const props = defineProps({
  permissions: Array,
  pagination: Object,
  isLoading: Boolean,
  error: String,
  currentPage: Number
})

const emit = defineEmits(['update:currentPage'])

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

</script>
