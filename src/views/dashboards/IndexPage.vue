<template>
  <div class="row">
    <div class="col-md-12 col-lg-12">
      <div class="row row-cols-1" data-aos="fade-up" data-aos-delay="700">
        <div class="d-slider1 overflow-hidden swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
          <Swiper
            class="p-0 m-0 mb-2 swiper-wrapper list-inline"
            :modules="modules"
            :slides-per-view="4"
            :space-between="32"
            :navigation="{
              nextEl: '#blog-tranding-next',
              prevEl: '#blog-tranding-prev'
            }">
            <template v-if="isLoading">
              <div v-for="index in 4" :key="index" class="swiper-slide card card-slide">
                <b-card-body class="bg-soft-primary shadow border-dark rounded">
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="bg-soft-primary rounded p-3 skeleton-box" style="width: 40px; height: 40px;"></div>
                    <div class="text-end w-100">
                      <p class="mb-2 text-dark skeleton-box" style="width: 80px; height: 14px;"></p>
                      <h4 class="counter skeleton-box" style="width: 50px; height: 24px;"></h4>
                      <span><small class="text-muted skeleton-box" style="width: 60px; height: 12px;"></small></span>
                    </div>
                  </div>
                </b-card-body>
              </div>
            </template>
            <SwiperSlide v-else class="swiper-slide card card-slide" v-for="(item, index) in swiperItems" :key="index">
              <b-card-body class="bg-soft-primary shadow border-dark rounded">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="bg-soft-primary rounded p-3">
                    <svg width="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.997 15.1746C7.684 15.1746 4 15.8546 4 18.5746C4 21.2956 7.661 21.9996 11.997 21.9996C16.31 21.9996 19.994 21.3206 19.994 18.5996C19.994 15.8786 16.334 15.1746 11.997 15.1746Z" fill="currentColor"></path>
                      <path opacity="0.4" d="M11.9971 12.5838C14.9351 12.5838 17.2891 10.2288 17.2891 7.29176C17.2891 4.35476 14.9351 1.99976 11.9971 1.99976C9.06008 1.99976 6.70508 4.35476 6.70508 7.29176C6.70508 10.2288 9.06008 12.5838 11.9971 12.5838Z" fill="currentColor"></path>
                    </svg>
                  </div>
                  <div class="text-end">
                    <p class="mb-2 text-dark">{{ item.subTitle }}</p>
                    <h4 class="counter">{{ item.amount }}</h4>
                    <span><small class="text-muted">{{item.days}}</small></span>
                  </div>
                </div>
              </b-card-body>
            </SwiperSlide>
          </Swiper>
          <div class="swiper-button swiper-button-next" id="blog-tranding-next"></div>
          <div class="swiper-button swiper-button-prev" id="blog-tranding-prev"></div>
          <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
        </div>
      </div>
      <!-- Include the table component here -->
      <table-component data-aos="fade-up" data-aos-delay="800" />
    </div>
  </div>
</template>

<script>
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import AOS from 'aos';
import TableComponent from '@/views/Components/TableComponent.vue';
import api from '@/plugins/axios';

export default {
  components: {
    Swiper,
    SwiperSlide,
    TableComponent,
  },
  data() {
    return {
      user: {},
      summary: {},
      modules: [Navigation],
      swiperItems: [],
      isLoading: true,
    };
  },
  created() {
    this.token = localStorage.getItem('access_token');
    this.fetchData();
  },
  mounted() {
    this.user = localStorage.getItem('user');
    AOS.init({
      disable: function () {
        var maxWidth = 996;
        return window.innerWidth < maxWidth;
      },
      once: true,
      duration: 800,
    });
  },
  methods: {
    async fetchData(){
      try {
        const response = await api.get('/dashboard/summary-cards', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`,
          },
        });

        this.summary = response.data.result;
        this.swiperItems =  [
          {
            amount: this.summary.customer_count,
            subTitle: 'Customer',
            days: this.summary.customer_created,
          },
          {
            amount: this.summary.asset_count,
            subTitle: 'Contract Vendor',
            days: this.summary.asset_created,
          },
          {
            amount: this.summary.license_count,
            subTitle: 'Licenses',
            days: this.summary.license_created,
          },
          {
            amount: this.summary.contract_vendor_count,
            subTitle: 'Assets',
            days: this.summary.contract_vendor_created,
          },
        ];
        
        this.isLoading = false;
      } catch (error) {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    },
  },  
};
</script>

<style>
.skeleton-box {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>