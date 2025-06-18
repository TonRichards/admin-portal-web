<template>
  <aside class="w-80 bg-blue-900 text-white flex flex-col shadow-lg">
    <div class="p-6 font-bold text-2xl border-b border-blue-800 space-y-2">
      <div>ECOM-ERP</div>

      <div class="relative inline-block w-64">
        <select
          v-model="orgStore.currentOrgId"
          @change="orgStore.switchOrganization($event.target.value)"
          class="w-full appearance-none text-sm bg-white border border-gray-300 rounded-lg py-1 px-4 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option v-if="!orgStore.currentOrgId" disabled value="">No organization found !!</option>
          <option v-for="o in orgStore.list" :key="o.organization_id" :value="o.organization_id">
            {{ o.name }}
          </option>
        </select>

        <!-- dropdown arrow -->
        <div
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </div>
    </div>

    <nav class="flex-1 p-4 space-y-2 text-sm">
      <SidebarItem :icon="ViewDashboardOutlineIcon" label="Dashboard" to="/dashboard" />
      <SidebarItem :icon="ReceiptOutlineIcon" label="จัดการออร์เดอร์" to="/orders" />
      <SidebarItem :icon="TruckOutlineIcon" label="คลังสินค้า" to="/inventories" />

      <SidebarCollapseItem
        :icon="CogOutlineIcon"
        label="จัดการผู้ใช้งาน"
        :children="[
          { label: 'ผู้ใช้งาน', to: '/users', icon: AccountOutlineIcon },
          { label: 'สิทธิ์การใช้งาน', to: '/roles', icon: ShieldAccountOutlineIcon },
          // { label: 'Permissions', to: '/permissions', icon: KeyOutlineIcon },
          { label: 'จัดการบริษัท/ร้านค้า', to: '/organizations', icon: OfficeBuildingIcon },
        ]"
      />
    </nav>
  </aside>
</template>

<script setup>
import { useOrganizationStore } from '@/stores/organizationStore'

import SidebarItem from './SidebarItem.vue'
import SidebarCollapseItem from './SidebarCollapseItem.vue'

import ViewDashboardOutlineIcon from 'vue-material-design-icons/ViewDashboardOutline.vue'
import ReceiptOutlineIcon from 'vue-material-design-icons/ReceiptOutline.vue'
import TruckOutlineIcon from 'vue-material-design-icons/TruckOutline.vue'
import CogOutlineIcon from 'vue-material-design-icons/CogOutline.vue'
import AccountOutlineIcon from 'vue-material-design-icons/AccountOutline.vue'
import ShieldAccountOutlineIcon from 'vue-material-design-icons/ShieldAccountOutline.vue'
import OfficeBuildingIcon from 'vue-material-design-icons/OfficeBuilding.vue'

const orgStore = useOrganizationStore()
</script>
