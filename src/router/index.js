import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Splash from '../views/Splash.vue'
import { default as LayoutDefault } from '../layouts/Default.vue'
import characterRouter from './character.router'
import coreRouter from './core.router'
import storyRouter from './story.router'
import initialRouter from './initial.router'

const routes = [
  ...initialRouter,
  {
    path: '/app',
    component: LayoutDefault,
    children: [
      ...storyRouter,
      ...coreRouter,
      ...characterRouter
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
