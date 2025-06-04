<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <!-- Email -->
    <div class="relative">
      <label class="block text-sm font-medium text-gray-700">Email</label>
      <input
        v-model="form.email"
        type="email"
        required
        @focus="showResults = true"
        @blur="handleBlur"
        class="mt-1 block w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
      />
      <ul
        v-if="showResults && searchResults.length > 0"
        class="absolute z-10 w-full bg-white border mt-1 rounded-xl shadow max-h-40 overflow-auto"
      >
        <li
          v-for="user in searchResults"
          :key="user.id"
          @mousedown.prevent="selectUser(user)"
          class="px-4 py-2 hover:bg-blue-100 cursor-pointer text-sm"
        >
          {{ user.email }} <span class="text-gray-400">({{ user.name }})</span>
        </li>
      </ul>
  </div>

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

    <!-- Password -->
    <div v-if="!selectedUser">
      <label class="block text-sm font-medium text-gray-700">Password</label>
      <input
        v-model="form.password"
        type="password"
        required
        class="mt-1 block w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
      />
    </div>

    <!-- Confirm Password -->
    <div v-if="!selectedUser">
      <label class="block text-sm font-medium text-gray-700">Confirm Password</label>
      <input
        v-model="form.password_confirmation"
        type="password"
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
                v-for="role in roles.filter(r => r.organization_id === organization.id)"
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
  import axiosUser from '@/lib/axiosUser'

  import { onMounted, ref, computed, watch } from 'vue'
  import { useUserForm } from '@/composables/user/useUserForm'
  import { roleSelectOptions, organizationSelectOptions, userSelectOptions } from '@/services/selectOptionService'

  const showResults = ref(false)
  const searchResults = ref([])
  const selectedUser = ref(null)

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

  const handleBlur = () => {
    setTimeout(() => {
      showResults.value = false
    }, 150)
  }

  const isEditMode = computed(() => typeof props.modelValue?.id === 'string' && props.modelValue.id.length > 5)
  const { form, populate, getPayload, isValid } = useUserForm()

  const organizations = ref([])
  const roles = ref([])

  const fetchOrganizations = async () => {
    try {
      const res = await organizationSelectOptions()
      organizations.value = res.data.data.data
    } catch (err) {
      console.error('Error fetching organizations:', err)
    }
  }

  const fetchRoles = async () => {
    try {
      const res = await roleSelectOptions()
      roles.value = res.data.data.data
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
  watch(() => form.email, async (val) => {
    if (!val || val.length < 1) {
      searchResults.value = []
      return
    }

    try {
      const res = await userSelectOptions({ params: { q: val } })
      searchResults.value = res.data.data.data
    } catch (err) {
      console.error('Search error:', err)
      searchResults.value = []
    }
  })

  const selectUser = (user) => {
    form.email = user.email
    form.name = user.name
    selectedUser.value = user
    searchResults.value = []
    showResults.value = false
  }
</script>
