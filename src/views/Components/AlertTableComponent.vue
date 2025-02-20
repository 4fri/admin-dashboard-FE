<template>
  <div class="container-fluid">
    <div class="card shadow w-100">
      <div class="card-body">
        <div class="table-responsive">
          <TableWidget 
            v-if="!loading"
            :rows="tableData" 
            :columns="columns"
            :buttonEdit="{ visible: false, disable: false }"
            :buttonDelete="{ visible: false, disable: false }"
            :filterColumns="filterColumns"  
            :pagination="pagination"
            @page-changed="changePage"
          />
          
          <div v-else class="skeleton-loader">
            <div v-for="n in 5" :key="n" class="skeleton-row"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableWidget from '@/components/widgets/users/TableData.vue';
import api from '@/plugins/axios';

export default {
  components: {
    TableWidget,
  },
  data() {
    return {
      loading: true,
      columns: [
        { label: 'Companies', key: 'company_name' },
        { label: 'License Name', key: 'license_name' },
        { label: 'Seats', key: 'seats' },
        { label: 'Category Name', key: 'category_name' },
        { label: 'Manufactur', key: 'manufactur_name' },
        { label: 'Expired Date', key: 'expiration_date' },
        { label: 'Remaining Seats', key: 'remaining_seats' },
        { label: 'Days of Remaining', key: 'days_remaining' }
      ],
      filterColumns: true,
      tableData: [],
      token: '',
      pagination: {
        current_page: 1,
        last_page: 1,
        prev_page_url: null,
        next_page_url: null,
      },
    };
  },

  created() {
    this.token = localStorage.getItem('access_token');
    this.fetchData();
  },
  methods: {
    async fetchData(page = 1) {
      this.loading = true;
      try {
        const response = await api.get('/alerts', {
          params: { page },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`,
          },
        });
        
        this.tableData = response.data.result.data.map((alert) => ({
          company_name: alert.company_name,
          license_name: alert.license_name,
          seats: alert.seats,
          category_name: alert.category_name,
          manufactur_name: alert.manufactur_name,
          expiration_date: alert.expiration_date,
          remaining_seats: alert.remaining_seats,
          days_remaining: alert.days_remaining,
        }));

        this.pagination = {
          current_page: response.data.result.current_page,
          last_page: response.data.result.last_page,
          prev_page_url: response.data.result.prev_page_url,
          next_page_url: response.data.result.next_page_url,
        };
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        this.loading = false;
      }
    },
    changePage(page) {
      if (page >= 1 && page <= this.pagination.last_page) {
        this.fetchData(page);
      }
    },
    navigateToRoute(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>

<style scoped>
.container-fluid {
  padding: 1rem;
}
.card {
  border-radius: 12px;
}
.skeleton-loader {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
}
.skeleton-row {
  height: 20px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
