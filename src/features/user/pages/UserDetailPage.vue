<template>
    <AdminLayout>
        <main class="flex-1 p-6 bg-gray-50 overflow-auto space-y-6">
            <div class="p-6 space-y-6 max-w-4xl mx-auto">
                <h1 class="text-2xl font-bold">User detail</h1>
                <div v-if="isLoading" class="text-center text-gray-500">Loading...</div>
                <div v-else-if="error" class="text-center text-red-500">{{ error }}</div>
                <UserForm
                    v-else
                    v-model="user"
                    :roles="allRoles"
                    :readonly="true"
                    @submit="handleSubmit"
                />
            </div>
        </main>
    </AdminLayout>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { getRoles } from '@/features/role/services/roleService'
    import { getUser, updateUser  } from '@/features/user/services/userService'
    import { useRoute, useRouter } from 'vue-router'
    import UserForm from '@/features/user/components/UserForm.vue'
    import AdminLayout from '@/layouts/AdminLayout.vue'

    const route = useRoute()
    const router = useRouter()

    const user = ref(null)
    const allRoles = ref([])
    const isLoading = ref(true)
    const error = ref(null)

    const fetchUser = async () => {
        try {
            isLoading.value = true
            const res = await getUser(route.params.id)
            user.value = res.data.data
        } catch (err) {
            error.value = err.response?.data?.message || err.message
        } finally {
            isLoading.value = false
        }
    }

    const fetchRoles = async () => {
        try {
            const applicationId = import.meta.env.VITE_APPLICATION_ID
            const res = await getRoles({
                params: {
                    application_id: applicationId,
                    sort: 'display_name',
                    order: 'asc',
                    per_page: 100,
                },
            })
            allRoles.value = res.data.data
        } catch (err) {
            console.error('Error fetching roles:', err)
        }
    }

    onMounted(async () => {
        await Promise.all([fetchRoles(), fetchUser()])
    })

    const handleSubmit = async (payload) => {
        try {
            await updateUser(route.params.id, payload)
            router.push('/users')
        } catch (err) {
            console.error('Update user failed:', err)
        }
    }

</script>
