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
import api from "./plugins/axios"; // Pastikan ini diimpor
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import Swal from 'sweetalert2';

const Token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzM5MzM1OTY1LCJleHAiOjE3MzkzMzk1NjUsIm5iZiI6MTczOTMzNTk2NSwianRpIjoiZXlNZjJMbDhiTGUxT1FmVSIsInN1YiI6IjllMzExMjI3LTc4OWMtNDlhMS1hNGZmLWQ3Yzk0MjM0NWIzOCIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.dh_wGfCOy0zfmwt9KNqSkAgCdwtxKyOcoq2OrnAuVQo';
const options = {
    timeout: 3000, // Durasi toast
    position: "bottom-right", // Posisi toast
  };


require('waypoints/lib/noframework.waypoints.min')

const app = createApp(App)
app.use(store).use(router)
app.use(Toast, options);
// Library Components
app.use(VueSweetalert2)
app.use(VueApexCharts)
app.use(BootstrapVue3)
app.component('counter-up', CounterUp)

// Custom Components & Directives
app.use(globalComponent)
app.use(globalDirective)
app.mixin(globalMixin)

// Gunakan API sebagai global instance
app.config.globalProperties.$swal = Swal;
app.config.globalProperties.$api = api;
app.config.globalProperties.$token = Token;

app.mount('#app')
console.log('Global token:', app.config.globalProperties.$token); // Debugging token

export default app
