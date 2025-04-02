<template>
  <aside class="w-64 bg-blue-900 text-white flex flex-col shadow-lg">
    <div class="p-6 font-bold text-2xl text-yellow-400 border-b border-blue-800">Admin Portal</div>

    <nav class="flex-1 p-4 space-y-2 text-sm">
      <SidebarItem icon="mdi-view-dashboard-outline" label="Dashboard" to="/dashboard" />
      <SidebarItem icon="mdi-folder-outline" label="Project Management" to="/projects" />
      <SidebarItem icon="mdi-receipt-outline" label="Orders" to="/orders" />
      <SidebarItem icon="mdi-truck-outline" label="Shipping" to="/shipping" />

      <div class="mt-6 text-yellow-300 uppercase font-bold tracking-wide text-xs">Settings</div>

      <SidebarCollapseItem
        icon="mdi-cog-outline"
        label="Settings"
        :children="[
          { label: 'Users', to: '/users', icon: 'mdi-account-outline' },
          { label: 'Roles', to: '/roles', icon: 'mdi-shield-account-outline' },
          { label: 'Permissions', to: '/permissions', icon: 'mdi-key-outline' },
        ]"
      />
    </nav>
  </aside>
</template>

<script setup>
import SidebarItem from './SidebarItem.vue'
import SidebarCollapseItem from './SidebarCollapseItem.vue'
</script>
