<template>
  <div class="space-y-4">
    <!-- Header -->
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Role List</h1>
      <button
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
        @click="addRole"
      >
        + Add Role
      </button>
    </div>

    <!-- Search -->
    <input
      type="text"
      placeholder="Search roles..."
      class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
    />

    <!-- Table -->
    <div class="overflow-auto rounded-xl shadow border bg-white">
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
          <tr v-if="roles.length === 0">
            <td colspan="3" class="px-6 py-4 text-center text-gray-400">
              No roles found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const roles = ref([])

const addRole = () => {
  emit('add')
}

const editRole = (role) => {
  emit('edit', role)
}

const confirmDelete = (role) => {
  emit('delete', role)
}

const emit = defineEmits(['edit', 'delete', 'add'])

const props = defineProps({
  roles: Array
})
</script>
