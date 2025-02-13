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
            <SwiperSlide class="swiper-slide card card-slide" v-for="(item, index) in swiperItems" :key="index">
              <b-card-body class="bg-soft-primary shadow border-dark rounded">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="bg-soft-primary rounded p-3">
                    <svg width="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.997 15.1746C7.684 15.1746 4 15.8546 4 18.5746C4 21.2956 7.661 21.9996 11.997 21.9996C16.31 21.9996 19.994 21.3206 19.994 18.5996C19.994 15.8786 16.334 15.1746 11.997 15.1746Z" fill="currentColor"></path>
                      <path opacity="0.4" d="M11.9971 12.5838C14.9351 12.5838 17.2891 10.2288 17.2891 7.29176C17.2891 4.35476 14.9351 1.99976 11.9971 1.99976C9.06008 1.99976 6.70508 4.35476 6.70508 7.29176C6.70508 10.2288 9.06008 12.5838 11.9971 12.5838Z" fill="currentColor"></path>
                    </svg>
                  </div>
                  <div class="text-end">
                    <p class="mb-2 text-dark">{{ item.subTitle }}</p>
                    <h4 class="counter">{{ item.amount }}</h4>
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
import { onMounted, ref } from 'vue'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue'
import AOS from 'aos'
import TableComponent from '@/views/Components/TableComponent.vue'

export default {
  components: {
    Swiper,
    SwiperSlide,
    TableComponent
  },
  setup() {
    const modules = [Navigation]
    const swiperItems = ref([
      {
        size: 90,
        amount: '560K',
        subTitle: 'Customer',
        color: 'primary'
      },
      {
        size: 80,
        amount: '185K',
        subTitle: 'Contract Vendor',
        color: 'info'
      },
      {
        size: 70,
        amount: '375K',
        subTitle: 'Licenses',
        color: 'primary'
      },
      {
        size: 60,
        amount: '742K',
        subTitle: 'Assets',
        color: 'info'
      }
    ])
    onMounted(() => {
      AOS.init({
        disable: function () {
          var maxWidth = 996
          return window.innerWidth < maxWidth
        },
        once: true,
        duration: 800
      })
    })
    return { modules, swiperItems }
  }
}
</script>
