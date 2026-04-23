<script setup>
import { onMounted, reactive, ref } from "vue";
import JobListing from "./JobListing.vue";
import PulseLoader from "./PulseLoader.vue";

const state = reactive({
    jobs: [],
    isLoading: true
})
defineProps({
    limit: Number,
    showButton: {
        type: Boolean,
        default: false
    }
})
async function listJobs() {
    try {
        const resp = await fetch("/api/jobs")
        const data = await resp.json()
        if (data.error) {
            throw "Error"
        }
        return data
    } catch (error) {
        console.log('fetch error', error)
        return []
    } finally {
        state.isLoading = false
    }
}
onMounted(async () => {
    state.jobs = await listJobs()
})
</script>
<template>
    <section class="bg-blue-50 px-4 py-10">
        <div class="max-w-xl lg:container m-auto">
            <h2 class="text-3xl font-bold text-green-500 mb-6 text-center">
                Browse Jobs
            </h2>
            <div v-if="state.isLoading" class="text-center py-2">
                <PulseLoader />
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <JobListing v-for="job in state.jobs.slice(0, limit || state.jobs.length)" :key="job.id" :job="job" />
            </div>
        </div>
    </section>
    <section v-if="showButton" class="m-auto max-w-lg my-10 px-6">
        <RouterLink to="/jobs" class="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700">View
            All Jobs</RouterLink>
    </section>
</template>