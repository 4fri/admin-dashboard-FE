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
            :breakpoints="{
              320: { slidesPerView: 1 },
              550: { slidesPerView: 2 },
              991: { slidesPerView: 3 },
              1400: { slidesPerView: 3 },
              1500: { slidesPerView: 4 },
              1920: { slidesPerView: 4 },
              2040: { slidesPerView: 7 },
              2440: { slidesPerView: 8 }
            }"
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
// import AnalyticsWidget from '@/components/widgets/AnalyticsWidget.vue'
import AOS from 'aos'
import TableComponent from '@/views/Components/TableComponent.vue'

export default {
  components: {
    Swiper,
    SwiperSlide,
    // AnalyticsWidget,
    TableComponent
  },
  setup() {
    const modules = [Navigation]
    const grossSaleChart = ref({
      series: [
        {
          name: 'total',
          data: [94, 80, 94, 80, 94, 80, 94]
        },
        {
          name: 'pipline',
          data: [72, 60, 84, 60, 74, 60, 78]
        }
      ],
      options: {
        chart: {
          fontFamily: '"Inter", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          height: 245,
          type: 'area',
          toolbar: {
            show: false
          },
          sparkline: {
            enabled: false
          }
        },
        colors: ['#3a57e8', '#079aa2'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 3
        },
        yaxis: {
          show: true,
          labels: {
            show: true,
            minWidth: 19,
            maxWidth: 19,
            style: {
              colors: '#8A92A6'
            },
            offsetX: -5
          }
        },
        legend: {
          show: false
        },
        xaxis: {
          labels: {
            minHeight: 22,
            maxHeight: 22,
            show: true,
            style: {
              colors: '#8A92A6'
            }
          },
          lines: {
            show: false // or just here to disable only x axis grids
          },
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug']
        },
        grid: {
          show: false
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'vertical',
            shadeIntensity: 0,
            gradientToColors: undefined, // optional, if not defined - uses the shades of same color in series
            inverseColors: true,
            opacityFrom: 0.4,
            opacityTo: 0.1,
            stops: [0, 50, 80],
            colors: ['#3a57e8', '#4bc7d2']
          }
        },
        tooltip: {
          enabled: true
        }
      }
    })
    const earningChart = ref({
      series: [55, 75],
      options: {
        chart: {
          height: 260,
          type: 'radialBar'
        },
        colors: ['#4bc7d2', '#3a57e8'],
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 10,
              size: '50%'
            },
            track: {
              margin: 10,
              strokeWidth: '50%'
            },
            dataLabels: {
              show: false
            }
          }
        }
      }
    })
    const conversionChart = ref({
      series: [
        {
          name: 'Successful deals',
          data: [30, 50, 35, 60, 40, 60, 60, 30, 50, 35]
        },
        {
          name: 'Failed deals',
          data: [40, 50, 55, 50, 30, 80, 30, 40, 50, 55]
        }
      ],
      options: {
        chart: {
          type: 'bar',
          height: 230,
          stacked: true,
          toolbar: {
            show: false
          }
        },
        colors: ['#3a57e8', '#4bc7d2'],
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: '28%',
            endingShape: 'rounded',
            borderRadius: 5
          }
        },
        legend: {
          show: false
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ['transparent']
        },
        xaxis: {
          categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S', 'M', 'T', 'W'],
          labels: {
            minHeight: 20,
            maxHeight: 20,
            style: {
              colors: '#8A92A6'
            }
          }
        },
        yaxis: {
          title: {
            text: ''
          },
          labels: {
            minWidth: 19,
            maxWidth: 19,
            style: {
              colors: '#8A92A6'
            }
          }
        },
        fill: {
          opacity: 1
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return '$ ' + val + ' thousands'
            }
          }
        }
      }
    })
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
    return { modules, grossSaleChart, earningChart, conversionChart, swiperItems }
  }
}
</script>
