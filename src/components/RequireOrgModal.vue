<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6 animate-fade-in">
      <div class="space-y-2">
        <h2 class="text-xl font-semibold text-gray-800">No Organization Found</h2>
        <p class="text-gray-600 text-sm">
          You have no organization yet.<br />
          Create one to continue, or Cancel to browse menus (without data).
        </p>
      </div>
      <div class="flex justify-end gap-4">
        <button
          @click="$emit('cancel')"
          class="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          @click="$emit('create')"
          class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Create Organization
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['create', 'cancel'])
</script>

<style scoped>
@keyframes fade-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
