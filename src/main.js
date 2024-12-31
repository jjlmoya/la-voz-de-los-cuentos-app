import '@overgaming/vicius/styles'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/css/theme.css'
import './assets/css/fonts.css'
import './assets/css/styles.css'
import './assets/css/animations.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
