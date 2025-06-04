<template>
    <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div class="bg-white p-6 rounded-xl w-full max-w-md space-y-4 shadow-xl">
            <h2 class="text-xl font-semibold">Edit Role</h2>
  
            <!-- Role Name -->
            <div class="space-y-2">
                <label class="block text-sm font-medium">Role Name</label>
                <input
                    v-model="form.name"
                    type="text"
                    class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
                />
            </div>

            <!-- Display Name -->
            <div class="space-y-2">
                <label class="block text-sm font-medium">Display Name</label>
                <input
                    v-model="form.display_name"
                    type="text"
                    class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
                />
            </div>
  
            <!-- Permissions -->
            <div v-if="permissions.length === 0" class="text-center text-gray-500">
                Loading permissions...
            </div>
            <div v-else class="space-y-2">
                <label class="block text-sm font-medium">Permissions</label>
                <div class="border rounded-xl p-2 max-h-40 overflow-y-auto space-y-1">
                    <label
                    v-for="permission in permissions"
                    :key="permission.id"
                    class="flex items-center space-x-2 text-sm"
                    >
                    <input
                        type="checkbox"
                        :value="permission.name"
                        v-model="form.permission_names"
                    />
                    <span>{{ permission.label_en }}</span>
                    </label>
                </div>
            </div>
  
            <!-- Buttons -->
            <div class="flex justify-end gap-2 pt-2">
                <button @click="$emit('close')" class="text-gray-600 hover:underline">
                    Cancel
                </button>
                <button
                    @click="submit"
                    class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl"
                >
                    Save
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { reactive, watch } from 'vue'

    const props = defineProps({
        role: Object,
        permissions: Array,
    })

    const emit = defineEmits(['close', 'updated'])

    const form = reactive({
        name: '',
        display_name: '',
        permission_names: [],
    })

    watch(
        () => [props.role, props.permissions], ([role, permissions]) => {
            if (role && permissions.length > 0) {
                form.name = role.name
                form.display_name = role.display_name
                form.permission_names = role.permissions.map(p =>
                    typeof p === 'object' ? p.name : p
                )
            }
        },
        { immediate: true }
    )

    const submit = () => {
        if (!form.name.trim()) {
        alert('Please enter a role name')
        return
        }
    
        emit('updated', { ...form, id: props.role.id })
    }
</script>
  