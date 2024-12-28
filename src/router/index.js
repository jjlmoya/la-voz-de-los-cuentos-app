import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Splash from '../views/Splash.vue'

const routes = [
    {
        path: '/',
        name: 'Splash',
        component: Splash
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router