<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
    <div class="text-center space-y-6"> <!-- เพิ่ม space-y เป็น 6 -->
      <h1 class="text-4xl font-bold">Welcome to ECOM-ERP</h1>
      <div class="flex justify-center space-x-4"> <!-- ปรับตำแหน่งปุ่มให้อยู่ด้วยกันและห่างกัน -->
        <router-link to="/register">
          <button class="px-6 py-2 bg-white text-blue-600 rounded shadow hover:bg-yellow-400 hover:text-white transition">
            Register
          </button>
        </router-link>
        <router-link to="/login">
          <button class="px-6 py-2 bg-white text-blue-600 rounded shadow hover:bg-yellow-400 hover:text-white transition">
            Login
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>