/* eslint-disable */
<template>
  <b-row>
    <b-col sm="12">
      <div class="card">
        <div class="card-header d-flex justify-content-between">
          <div class="header-title">
            <h4 class="card-title">User List</h4>
          </div>
          <div class="header-title">
            <a href="#" class="btn btn-primary" title="User Add" @click.prevent="navigateToRoute('default.user-add')">User Add</a>
          </div>
        </div>

        <!-- Skeleton Loader -->
        <div v-if="loading" class="p-3">
          <div v-for="n in 5" :key="n" class="skeleton-row"></div>
        </div>

        <!-- Table Widget -->
        <TableWidget 
          v-if="!loading"
          :rows="tableData" 
          :columns="columns"
          :buttonEdit="{ visible: true, disable: false }"
          :buttonDelete="{ visible: true, disable: false }"
          :pagination="pagination"
          @page-changed="changePage"
          @delete="deleteRow"
          @edit="editUser"
        />
      </div>
    </b-col>
  </b-row>
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
      tableData: [],
      pagination: {
        current_page: 1,
        last_page: 1,
        prev_page_url: null,
        next_page_url: null,
      },
      columns: [
        { key: 'fullname', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'roles', label: 'Roles' },
      ],
      token: '',
      loading: true,
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
        const response = await api.get('/users', {
          params: { page },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`,
          },
        });

        this.tableData = response.data.result.data.map((user) => ({
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          roles: user.roles.join(', '),
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

    deleteRow(id) {
      this.$swal
        .fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Yes, delete it!',
        })
        .then((result) => {
          if (result.isConfirmed) {
            api
              .delete(`/users/${id}/destroy`, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${this.token}`,
                },
              })
              .then(() => {
                this.tableData = this.tableData.filter((item) => item.id !== id);
                this.$toast.success("Data berhasil dihapus!");
              })
              .catch((error) => {
                console.error('Error deleting row:', error);
                this.$toast.error("Data gagal dihapus!");
              });
          }
        });
    },

    // navigateToRoute(routeName) {
    //   this.$router.push({ name: routeName });
    // },

    editUser(user) {
      if (user && user.id) {
        const userId = user.id;
        this.navigateToRoute('prefix.user-edit', { id: userId });
        // this.$router.push({ name: 'prefix.user-edit', params: { id: userId } });
      } else {
        console.error('Error: userId is undefined or null');
      }
    },
    navigateToRoute(routeName, params = {}) {
      this.$router.push({ name: routeName, params }); // Navigasi ke rute dengan nama dan parameter
    },
  },
};
</script>
<style scoped>
.modal-backdrop.show {
  background-color: rgba(0, 0, 0, 0.8) !important;
}

.skeleton-row {
  height: 20px;
  background: #e0e0e0;
  margin: 10px 0;
  border-radius: 4px;
}
</style>