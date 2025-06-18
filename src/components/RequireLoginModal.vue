<template>
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6 animate-fade-in">
      <div class="space-y-2">
        <h2 class="text-xl font-semibold text-gray-800">คุณยังไม่ได้ Login เข้าสู่ระบบ</h2>
        <p class="text-gray-600 text-sm">
          กรุณา Login เข้าสู่ระบบอีกครั้ง.<br />
          หากคุณยังไม่ได้เป็นสมาชิก กรุณาสมัครสมาชิกเพื่อเข้าใช้งาน.
        </p>
      </div>
      <div class="flex justify-end gap-4">
        <button
          @click="$emit('login')"
          class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          เข้าระบบอีกครั้ง
        </button>
        <button
          @click="$emit('register')"
          class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          สมัครสมาชิก
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['login', 'register'])
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
</style>
