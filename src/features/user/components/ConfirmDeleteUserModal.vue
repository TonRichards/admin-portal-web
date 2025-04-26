<template>
    <div class="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-xl w-full max-w-sm space-y-4 shadow-xl text-center">
        <h2 class="text-lg font-semibold text-gray-800">
          Are you sure you want to delete this user?
        </h2>
        <p class="text-sm text-gray-500">This action cannot be undone.</p>
        <div class="flex justify-center gap-4 pt-4">
          <button
            @click="$emit('cancel')"
            class="px-4 py-2 rounded-xl text-sm text-gray-600 hover:underline"
          >
            Cancel
          </button>
          <button
            @click="$emit('confirm')"
            class="px-4 py-2 rounded-xl text-sm bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineEmits(['cancel','confirm'])
  </script>
  