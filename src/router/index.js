import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Splash from '../views/Splash.vue'

import { default as LayoutDefault } from '../layouts/Default.vue'

const routes = [
    {
        path: '/',
        name: 'Splash',
        component: Splash
    },  {
        path: '/app',
        component: LayoutDefault,
        children: [
            {
                path: 'home',
                name: 'Home',
                component: Home
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router