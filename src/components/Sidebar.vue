<template>
  <aside class="w-64 bg-blue-900 text-white flex flex-col shadow-lg">
    <div class="p-6 font-bold text-2xl border-b border-blue-800">Admin Portal</div>

    <nav class="flex-1 p-4 space-y-2 text-sm">
      <SidebarItem :icon="ViewDashboardOutlineIcon" label="Dashboard" to="/dashboard" />
      <SidebarItem :icon="FolderOutlineIcon" label="Project Management" to="/projects" />
      <SidebarItem :icon="ReceiptOutlineIcon" label="Orders" to="/orders" />
      <SidebarItem :icon="TruckOutlineIcon" label="Shipping" to="/shippings" />

      <SidebarCollapseItem
        :icon="CogOutlineIcon"
        label="Settings"
        :children="[
          { label: 'Users', to: '/users', icon: AccountOutlineIcon },
          { label: 'Roles', to: '/roles', icon: ShieldAccountOutlineIcon  },
          { label: 'Permissions', to: '/permissions', icon: KeyOutlineIcon  },
        ]"
      />
    </nav>
  </aside>
</template>

<script setup>
import SidebarItem from './SidebarItem.vue'
import SidebarCollapseItem from './SidebarCollapseItem.vue'

import ViewDashboardOutlineIcon from 'vue-material-design-icons/ViewDashboardOutline.vue'
import FolderOutlineIcon from 'vue-material-design-icons/FolderOutline.vue'
import ReceiptOutlineIcon from 'vue-material-design-icons/ReceiptOutline.vue'
import TruckOutlineIcon from 'vue-material-design-icons/TruckOutline.vue'
import CogOutlineIcon from 'vue-material-design-icons/CogOutline.vue'
import AccountOutlineIcon from 'vue-material-design-icons/AccountOutline.vue'
import ShieldAccountOutlineIcon from 'vue-material-design-icons/ShieldAccountOutline.vue'
import KeyOutlineIcon from 'vue-material-design-icons/KeyOutline.vue'
</script>
