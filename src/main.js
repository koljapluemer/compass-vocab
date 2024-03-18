import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import VNetworkGraph from "v-network-graph"
import "v-network-graph/lib/style.css"

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


createApp(App).use(pinia).use(VNetworkGraph).mount('#app')
