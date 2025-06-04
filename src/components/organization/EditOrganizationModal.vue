<template>
    <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-xl w-full max-w-md space-y-4 shadow-xl">
        <h2 class="text-xl font-semibold">Edit Organization</h2>
  
        <!-- Organization Name -->
        <div class="space-y-2">
          <label class="block text-sm font-medium">Organization Name</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
          />
        </div>
  
        <!-- Action Buttons -->
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
        organization: Object
    })

    const emit = defineEmits(['close', 'updated'])

    const form = reactive({
        name: '',
    })

    watch(
        () => [props.organization], ([organization]) => {
            if (organization) {
                form.name = organization.name
            }
        },
        { immediate: true }
    )

    const submit = () => {
        if (!form.name.trim()) {
        alert('Please enter a organization name')
        return
        }
    
        emit('updated', { ...form, id: props.organization.id })
    }
</script>
    