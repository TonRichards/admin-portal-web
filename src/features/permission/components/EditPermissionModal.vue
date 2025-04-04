<template>
    <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-xl w-full max-w-md space-y-4 shadow-xl">
        <h2 class="text-xl font-semibold">Edit Permission</h2>
  
        <!-- Permission Name -->
        <div class="space-y-2">
          <label class="block text-sm font-medium">Permission Name</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
          />
        </div>
  
        <!-- label_en -->
        <div class="space-y-2">
          <label class="block text-sm font-medium">Name EN</label>
          <input
            v-model="form.label_en"
            type="text"
            class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
          />
        </div>
  
        <!-- label_en -->
        <div class="space-y-2">
          <label class="block text-sm font-medium">Name TH</label>
          <input
            v-model="form.label_th"
            type="text"
            class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
          />
        </div>
  
        <!-- label_en -->
        <div class="space-y-2">
          <label class="block text-sm font-medium">Description EN</label>
          <input
            v-model="form.description_en"
            type="text"
            class="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring"
          />
        </div>
  
        <!-- label_en -->
        <div class="space-y-2">
          <label class="block text-sm font-medium">Description TH</label>
          <input
            v-model="form.description_th"
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
        permission: Object
    })

    const emit = defineEmits(['close', 'updated'])

    const form = reactive({
        name: '',
        label_en: '',
        label_th: '',
        description_en: '',
        description_th: '',
    })

    watch(
        () => [props.permission], ([permission]) => {
            if (permission) {
                form.name = permission.name
                form.label_en = permission.label_en
                form.label_th = permission.label_th
                form.description_en = permission.description_en
                form.description_th = permission.description_th
            }
        },
        { immediate: true }
    )

    const submit = () => {
        if (!form.name.trim()) {
        alert('Please enter a permission name')
        return
        }
    
        emit('updated', { ...form, id: props.permission.id })
    }
</script>
    