<template>
  <div class="d-slider1 overflow-hidden swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
    <Swiper
      class="p-0 m-0 mb-2 swiper-wrapper list-inline"
      :modules="modules"
      :slides-per-view="4"
      :space-between="32"
      :breakpoints="breakpoints"
      :navigation="navigation">
      <template v-if="isLoading">
        <div v-for="index in 4" :key="index" class="swiper-slide card card-slide">
          <b-card-body class="bg-soft-primary shadow border-dark rounded">
            <div class="d-flex justify-content-between align-items-center">
              <div class="bg-soft-primary rounded p-3 skeleton-box" style="width: 40px; height: 40px;"></div>
              <div class="text-end w-100">
                <p class="mb-2 text-dark fw-bold skeleton-box" style="width: 80px; height: 14px;"></p>
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
              <p class="mb-2 text-dark fw-bold">{{ item.subTitle }}</p>
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
</template>

<script>
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
    swiperItems: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      modules: [Navigation],
      breakpoints: {
        320: { slidesPerView: 1 },
        550: { slidesPerView: 2 },
        991: { slidesPerView: 3 },
        1400: { slidesPerView: 3 },
        1500: { slidesPerView: 4 },
        1920: { slidesPerView: 4 },
        2040: { slidesPerView: 7 },
        2440: { slidesPerView: 8 },
      },
      navigation: {
        nextEl: '#blog-tranding-next',
        prevEl: '#blog-tranding-prev',
      },
    };
  },
};
</script>

<style scoped>
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