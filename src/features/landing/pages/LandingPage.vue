<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
    <div class="text-center space-y-4">
      <h1 class="text-4xl font-bold">Welcome to Admin Portal</h1>
      <router-link to="/login">
        <button class="px-6 py-2 bg-white text-blue-600 rounded shadow hover:bg-yellow-400 hover:text-white transition">
          Login
        </button>
      </router-link>
    </div>
  </div>
</template>
