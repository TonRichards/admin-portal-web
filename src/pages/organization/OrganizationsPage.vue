<template>
  <AdminLayout>
    <!-- Content -->
    <main class="flex-1 p-6 bg-gray-50 overflow-auto space-y-6">
      <!-- Header + Add -->
      <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold">Organization List</h1>
        <button
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow"
          @click="openAddModal"
        >
          + Add Organization
        </button>
      </div>

      <!-- Table -->
      <OrganizationTable
        :organizations="organizations"
        :is-loading="isLoading"
        :error="error"
        @edit="edit"
        @delete="confirmDelete"
      />
    </main>
  </AdminLayout>

  <!-- Modals -->
  <AddOrganizationModal
    v-if="isAddModalOpen"
    @close="isAddModalOpen = false"
    @saved="saveOrganization"
  />

  <EditOrganizationModal
    v-if="isEditModalOpen"
    :organization="organizationToEdit"
    @close="isEditModalOpen = false"
    @updated="update"
  />

  <ConfirmDeleteModal
    v-if="isDeleteModalOpen"
    @cancel="isDeleteModalOpen = false"
    @confirm="destroy"
  />
</template>

<script setup>
  
  import AdminLayout from '@/layouts/AdminLayout.vue'
  import OrganizationTable from '@/components/organization/OrganizationTable.vue'
  import AddOrganizationModal from '@/components/organization/AddOrganizationModal.vue'
  import EditOrganizationModal from '@/components/organization/EditOrganizationModal.vue'
  import ConfirmDeleteModal from '@/components/organization/ConfirmDeleteOrganizationModal.vue'

  import { ref, onMounted } from 'vue'
  import {getOrganizations, createOrganization, updateOrganization, deleteOrganization } from '@/services/organizationService'

  const organizations = ref([])
  const isAddModalOpen = ref(false)
  const isEditModalOpen = ref(false)
  const organizationToEdit = ref(null)
  const isDeleteModalOpen = ref(false)
  const organizationToDelete = ref(null)
  const isLoading = ref(true)
  const error = ref(null)

  const fetchOrganizations = async () => {
      try {
          isLoading.value = true
          const response = await getOrganizations({})
          organizations.value = response.data.data
      } catch (err) {
          error.value = err.response?.data?.message || err.message
      } finally {
          isLoading.value = false
      }
  }

  const saveOrganization = async (payload) => {
      try {
          await createOrganization(payload)
          isAddModalOpen.value = false
          fetchOrganizations()
      } catch (err) {
          alert(err.response?.data?.message || err.message)
      }
  }

  const edit = (organization) => {
      organizationToEdit.value = organization
      isEditModalOpen.value = true
  }

  const update = async (payload) => {
      try {
          await updateOrganization(payload.id, payload)
          isEditModalOpen.value = false
          fetchOrganizations()
      } catch (err) {
          alert(err.response?.data?.message || err.message)
      }
  }

  const openAddModal = () => {
      isAddModalOpen.value = true
  }

    const confirmDelete = (organization) => {
      organizationToDelete.value = organization
      isDeleteModalOpen.value = true
    }

  const destroy = async () => {
      await deleteOrganization(organizationToDelete.value.id)
      isDeleteModalOpen.value = false
      fetchOrganizations()
  }

  onMounted(fetchOrganizations)
  
</script>
  