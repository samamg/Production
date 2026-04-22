import HomeView from '@/views/HomeView.vue'
import {createRouter, createMemoryHistory} from 'vue-router'

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            path: "/",
            name: 'home',
            component: HomeView
        }
    ]
})
export default router