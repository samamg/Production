<script setup>
import BackButton from '@/components/BackButton.vue'
import PulseLoader from '@/components/PulseLoader.vue'
import axios from 'axios'
import { onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import { useToast } from 'vue-toastification'
const toast = useToast()
const router = useRouter()
const state = reactive({
    job: {
        company: {}
    },
    isLoading: true
})

async function getJob(id) {
    try {
        const resp = await axios.get(`/api/jobs/${id}`)
        return await resp.data
    } catch (error) {
        console.log('fetch error', error)
        return { company: {} }
    } finally {
        state.isLoading = false
    }
}

async function deleteJob() {
    try {
        const confirm = window.confirm('Are you sure you want to delete this job?')
        if (confirm) {
            await axios.delete(`/api/jobs/${state.job.id}`)
            // Navigate to job listing
            router.push('/jobs')
            // Show alert to user
            toast.success('Job Deleted Successfully')
        } else {
            toast.info('You cancelled')
        }
    } catch (error) {
        // Show alert to user
        toast.error('Job Was Not Deleted')
        console.log('fetch error', error)
    } finally {
        state.isLoading = false
    }
}
onMounted(async () => {
    const route = useRoute()
    state.job = await getJob(route.params.id)
})
</script>
<template>
    <BackButton />
    <section v-if="!state.isLoading" class="bg-green-50">
        <div class="container m-auto py-10 px-6">
            <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <main>
                    <div class="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                        <div class="text-gray-500 mb-4">{{ state.job.type }}</div>
                        <h1 class="text-3xl font-bold mb-4">{{ state.job.title }}</h1>
                        <div class="text-gray-500 mb-4 flex align-middle items-center justify-center md:justify-start">
                            <i class="pi pi-map-marker text-orange-700 mr-2"></i>
                            <p class="text-orange-700">{{ state.job.location }}</p>
                        </div>
                    </div>

                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 class="text-green-800 text-lg font-bold mb-6">
                            Job Description
                        </h3>

                        <p class="mb-4">{{ state.job.description }}</p>

                        <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

                        <p class="mb-4">{{ state.job.salary }}</p>
                    </div>
                </main>

                <!-- Sidebar -->
                <aside>
                    <!-- Company Info -->
                    <div class="bg-white p-6 rounded-lg shadow-md">
                        <h3 class="text-xl font-bold mb-6">Company Info</h3>
                        <h2 class="text-2xl"> {{ state.job.company.name }} </h2>

                        <p class="my-2"> {{ state.job.company.description }} </p>

                        <hr class="my-4" />

                        <h3 class="text-xl">Contact Email:</h3>

                        <p class="my-2 bg-green-100 p-2 font-bold"> {{ state.job.company.contactEmail }} </p>

                        <h3 class="text-xl">Contact Phone:</h3>

                        <p class="my-2 bg-green-100 p-2 font-bold"> {{ state.job.company.contactPhone }} </p>
                    </div>

                    <!-- Manage -->
                    <div class="bg-white p-6 rounded-lg shadow-md mt-6">
                        <h3 class="text-xl font-bold mb-6">Manage Job</h3>
                        <RouterLink :to="`/jobs/edit/${state.job.id}`"
                            class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                            Edit
                            Job</RouterLink>
                        <button @click="deleteJob"
                            class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block">
                            Delete Job
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    </section>
    <div v-else class="text-center pb-4 h-screen flex items-center justify-center">
        <PulseLoader />
    </div>
</template>