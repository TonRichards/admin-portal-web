<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Content -->
    <main class="flex-1 p-6 bg-gray-50 overflow-auto">
      <OrderTable />
    </main>
  </div>
</template>

<script setup>
import Sidebar from '@/components/LeftSidebar.vue'
import OrderTable from '@/components/order/OrderTable.vue'
</script>
