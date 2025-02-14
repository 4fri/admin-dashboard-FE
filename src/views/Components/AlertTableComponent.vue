<template>
  <div class="container-fluid">
    <div class="card shadow w-100">
      <div class="card-body">
        <div class="table-responsive">
          <TableWidget 
            :rows="tableData" 
            :columns="columns"
            :buttonEdit="{ visible: false, disable: false }"
            :buttonDelete="{ visible: false, disable: false }"
            :pagination="pagination"
            @page-changed="changePage"
            />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TableWidget from '@/components/widgets/users/TableWidgetUsers.vue';
import api from '@/plugins/axios';

export default {
  components: {
    TableWidget,
  },
  data() {
    return {
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
    this.token =  localStorage.getItem('access_token');
    this.fetchData();
  },
  methods: {
    async fetchData(page = 1) {
      try {
        const response = await api.get('/alerts', {
          params: { page },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`,
          },
        });
        console.log('Response:', response.data.result.data);
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

  }
};
</script>

<style scoped>
.container-fluid {
  padding: 1rem;
}
.card {
  border-radius: 12px;
}
.progress-bar {
  transition: width 0.5s ease-in-out;
}
</style>
