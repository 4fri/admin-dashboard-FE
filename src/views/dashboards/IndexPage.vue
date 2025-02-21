<template>
  <div class="row">
    <div class="col-md-12 col-lg-12">
      <div class="row row-cols-1" data-aos="fade-up" data-aos-delay="700">
        <swiper-component
          :isLoading="isLoading"
          :swiperItems="swiperItems" 
        />
      </div>
      <!-- Include the table component here -->
      <table-component 
        data-aos="fade-up" 
        data-aos-delay="800" 
      />
    </div>
  </div>
</template>

<script>
import { Navigation } from 'swiper';
import AOS from 'aos';
import TableComponent from '@/views/Components/TableComponent.vue';
import SwiperComponent from '@/views/Components/SwiperComponent.vue';
import api from '@/plugins/axios';

export default {
  components: {
    TableComponent,
    SwiperComponent,
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
    this.fetchDataCard();
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
    async fetchDataCard(){
      try {
        const response = await api.get('/dashboard/count-summary-cards', {
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