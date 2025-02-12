import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// Library Components
import VueSweetalert2 from 'vue-sweetalert2'
import VueApexCharts from 'vue3-apexcharts'
import BootstrapVue3 from 'bootstrap-vue-3'
import CounterUp from 'vue3-autocounter'
import 'aos/dist/aos.css'

// Custom Components & Directives
import globalComponent from './plugins/global-components'
import globalDirective from './plugins/global-directive'
import globalMixin from './plugins/global-mixin'
import api from "./plugins/axios";
import Toast, { useToast } from "vue-toastification";
import "vue-toastification/dist/index.css";
import Swal from 'sweetalert2';

const Token = localStorage.getItem('access_token') || '';
const toastOptions = {
    timeout: 3000,
    position: "bottom-right",
};

require('waypoints/lib/noframework.waypoints.min')

const app = createApp(App)
app.use(store).use(router)
app.use(Toast, toastOptions)

// Library Components
app.use(VueSweetalert2)
app.use(VueApexCharts)
app.use(BootstrapVue3)
app.component('counter-up', CounterUp)

// Custom Components & Directives
app.use(globalComponent)
app.use(globalDirective)
app.mixin(globalMixin)

// Gunakan API, SweetAlert, dan Toast sebagai global instance
app.config.globalProperties.$swal = Swal;
app.config.globalProperties.$api = api;
app.config.globalProperties.$token = Token;
app.config.globalProperties.$toast = useToast(); // Menjadikan toast sebagai global instance

app.mount('#app')
console.log('Global token:', app.config.globalProperties.$token);

export default app
