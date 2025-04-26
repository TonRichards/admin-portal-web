<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <!-- Name -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Name</label>
      <input
        v-model="form.name"
        type="text"
        required
        class="mt-1 block w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
      />
    </div>

    <!-- Email -->
    <div>
      <label class="block text-sm font-medium text-gray-700">Email</label>
      <input
        v-model="form.email"
        type="email"
        required
        class="mt-1 block w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
      />
    </div>

    <!-- Organizations -->
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-2">Organizations</label>

      <div v-if="organizations.length === 0" class="text-gray-500 text-sm">
        No organizations found...
      </div>

      <div v-else class="grid gap-4">
        <div
          v-for="organization in organizations"
          :key="organization.id"
          class="border rounded-xl p-4 shadow-sm hover:shadow-md transition duration-200 bg-white"
        >
          <div class="flex items-start justify-between">
            <!-- Checkbox + organization Name -->
            <label class="flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                :value="organization.id"
                v-model="form.organization_roles"
                class="accent-blue-600 w-4 h-4"
              />
              {{ organization.name }}
            </label>
          </div>

          <!-- Role Selector -->
          <div v-if="form.organization_roles.includes(organization.id)" class="mt-3">
            <label class="block text-xs text-gray-500 mb-1">Assign Role</label>
            <select
              v-model="form.roles[organization.id]"
              class="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-500"
            >
              <option value="">Select Role</option>
              <option
                v-for="role in roles"
                :key="role.id"
                :value="role.id"
              >
                {{ role.display_name }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Submit -->
    <div class="pt-4">
      <button
        type="submit"
        class="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
      >
        {{ isEditMode ? 'Update User' : 'Save User' }}
      </button>
    </div>
  </form>
</template>

<script setup>
  import { onMounted, ref, computed, watch } from 'vue'
  import { useUserForm } from '@/features/user/composables/useUserForm'
  import axiosUser from '@/lib/axiosUser'

  const emit = defineEmits(['submit', 'update:modelValue'])
  const props = defineProps({
    modelValue: {
      type: Object,
      default: () => ({})
    },
    readonly: {
      type: Boolean,
      default: false
    }
  })

  const isEditMode = computed(() => !!props.modelValue)
  const { form, populate, getPayload, isValid } = useUserForm()

  const organizations = ref([])
  const roles = ref([])

  const fetchOrganizations = async () => {
    try {
      const res = await axiosUser.get('/organizations')
      organizations.value = res.data.data
    } catch (err) {
      console.error('Error fetching organizations:', err)
    }
  }

  const fetchRoles = async () => {
    try {
      const applicationId = import.meta.env.VITE_APPLICATION_ID
      const res = await axiosUser.get('/roles', {
        params: {
          application_id: applicationId,
          sort: 'display_name',
          order: 'asc',
          per_page: 100,
        },
      })
      roles.value = res.data.data
    } catch (err) {
      console.error('Error fetching roles:', err)
    }
  }

  const onSubmit = () => {
    if (!isValid()) return alert('กรอกให้ครบก่อน')
    const payload = getPayload()
    emit('update:modelValue', payload)
    emit('submit', payload)
  }

  onMounted(() => {
    fetchOrganizations()
    fetchRoles()
    populate(props.modelValue)
  })

  watch(() => props.modelValue, (val) => populate(val), { immediate: true })
</script>
