<template>
    <div class="space-y-4">
      <div v-if="props.isLoading" class="text-center py-10 text-gray-500">Loading organizations...</div>
      <div v-else-if="props.error" class="text-center text-red-500">{{ error }}</div>
      <div v-if="!props.isLoading && props.organizations.length === 0" class="text-center py-8 text-gray-500">No organizations found.</div>
  
      <div v-else class="overflow-auto rounded-xl shadow border bg-white">
        <table class="min-w-full text-sm text-left">
          <thead class="bg-gray-100">
            <tr>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="organization in props.organizations"
              :key="organization.id"
              class="border-t hover:bg-gray-50"
            >
              <td class="px-4 py-2">{{ organization.name }}</td>
              <td class="px-4 py-2 space-x-2">
                <button @click="editOrganization(organization)" class="text-blue-600 hover:underline">Edit</button>
                <button @click="confirmDelete(organization)" class="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  
  const props = defineProps({
    organizations: Array,
    isLoading: Boolean,
    error: String,
  })
  
  const emit = defineEmits(['edit', 'delete'])

  
  const editOrganization = (organization) => {
    emit('edit', organization)
  }
  
  const confirmDelete = (organization) => {
    emit('delete', organization)
  }
  
  </script>
  