<template>
  <div v-if="loading" class="text-gray-500">Loading...</div>
  <div v-else>
    <table class="w-full table-auto border border-gray-200 shadow-sm">
      <thead class="bg-blue-100 text-left">
        <tr>
          <th class="p-3 border-b">#</th>
          <th class="p-3 border-b">Permission Name</th>
          <th class="p-3 border-b">Description</th>
          <th class="p-3 border-b text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(permission, index) in permissions"
          :key="permission.id"
          class="hover:bg-yellow-50 transition"
        >
          <td class="p-3 border-b">{{ index + 1 }}</td>
          <td class="p-3 border-b text-blue-800 font-medium">{{ permission.name }}</td>
          <td class="p-3 border-b text-gray-700">{{ permission.description || '-' }}</td>
          <td class="p-3 border-b text-right space-x-2">
            <button
              class="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              @click="$emit('edit', permission)"
            >
              Edit
            </button>
            <button
              class="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              @click="$emit('delete', permission)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="permissions.length === 0" class="text-gray-500 mt-4">No permissions found.</div>
  </div>
</template>

<script setup>
defineProps({
  permissions: Array,
  loading: Boolean,
})
defineEmits(['edit', 'delete'])
</script>
