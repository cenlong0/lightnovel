import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
import SvgIcon from '@/icons'
import 'element-plus/dist/index.css'
// import * as ELIcons from '@element-plus/icons-vue'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000/'
axios.interceptors.request.use((config) => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
const Vue = createApp(App)
// for (const iconName in ELIcons) {
//   app.component(iconName, ELIcons[iconName])
// }

// Vue.prototype.$http = axios
Vue.config.productionTip = false
// new Vue({
//   router,
//   render: (h) => h(App)
// }).$mount('#app')

SvgIcon(Vue)
Vue.use(store).use(router).mount('#app')
