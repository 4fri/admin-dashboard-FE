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

        <!-- New Permission Modal -->
        <div class="modal fade" id="new-permission" ref="newPermissionModal"
             data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
             aria-labelledby="staticBackdropPermissionLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropPermissionLabel">Add Permission</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <div class="form-group">
                  <label class="form-label">Permission title</label>
                  <input type="text" class="form-control" placeholder="Permission Title" />
                </div>
                <div class="text-start">
                  <button type="button" class="btn btn-primary me-2" data-bs-dismiss="modal">Save</button>
                  <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Table Widget -->
        <TableWidget 
          :rows="tableData" 
          :columns="columns"
          :buttonEdit="{ visible: true, disable: false }"
          :buttonDelete="{ visible: true, disable: false }"
          :pagination="pagination"
          @page-changed="changePage"
          @delete="deleteRow"
          @edit="openNewPermissionModal"
        />
      </div>
    </b-col>
  </b-row>
</template>
<script>
import { ref, onMounted, getCurrentInstance } from 'vue';
import TableWidget from '@/components/widgets/users/TableWidgetUsers.vue';
import api from '@/plugins/axios';
import { Modal } from 'bootstrap';

export default {
  components: {
    TableWidget,
  },
  setup() {
    const tableData = ref([]);
    const pagination = ref({
      current_page: 1,
      last_page: 1,
      prev_page_url: null,
      next_page_url: null,
    });

    // Ambil instance Vue untuk mendapatkan globalProperties
    const instance = getCurrentInstance();
    const token = instance?.appContext.config.globalProperties.$token || '';

    // Fetch data dari API
    const fetchData = async (page = 1) => {
      try {
        const response = await api.get('/users', {
          params: { page },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        // Update data tabel
        tableData.value = response.data.result.data.map((user) => ({
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          roles: user.roles.join(', '),
        }));

        // Update pagination
        pagination.value = {
          current_page: response.data.result.current_page,
          last_page: response.data.result.last_page,
          prev_page_url: response.data.result.prev_page_url,
          next_page_url: response.data.result.next_page_url,
        };
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Fungsi untuk mengganti halaman
    const changePage = (page) => {
      if (page >= 1 && page <= pagination.value.last_page) {
        fetchData(page);
      }
    };

    // Fungsi untuk menghapus baris
    const deleteRow = (id) => {
      instance.proxy.$swal
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
              .delete(`/api/data/${id}/destroy`, {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              })
              .then(() => {
                // Hapus dari array lokal jika diperlukan
                tableData.value = tableData.value.filter((item) => item.id !== id);
                instance.proxy.$swal.fire('Deleted!', 'The row has been deleted.', 'success');
              })
              .catch((error) => {
                console.error('Error deleting row:', error);
                instance.proxy.$swal.fire('Error!', 'Failed to delete the row.', 'error');
              });
          }
        });
    };

    // Fungsi untuk membuka modal
    const openNewPermissionModal = () => {
      const modalElement = instance.refs.newPermissionModal;
      const modalInstance = new Modal(modalElement);
      modalInstance.show();
    };

    // Fetch data saat komponen dimount
    onMounted(() => fetchData());

    return {
      tableData,
      pagination,
      columns: [
        { key: 'fullname', label: 'Name' },
        { key: 'email', label: 'Email' },
        { key: 'roles', label: 'Roles' },
      ],
      changePage,
      deleteRow,
      openNewPermissionModal,
    };
  },
  methods: {
    navigateToRoute(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>
<style scoped>
.modal-backdrop.show {
  background-color: rgba(0, 0, 0, 0.8) !important;
}
</style>
