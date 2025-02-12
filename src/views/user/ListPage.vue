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
                  <!-- New Permission modal -->
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

        </div>
        <TableWidget 
         :rows="tableData" 
         :columns="columns"
         :buttonEdit="{ visible: true, disable: false }"
          :buttonDelete="{ visible: true, disable: false }"
          @delete="deleteRow"
          @edit="openNewPermissionModal"
         />
      </div>
    </b-col>
  </b-row>
</template>
<script>
import { ref, onMounted } from 'vue';
import TableWidget from '@/components/widgets/users/TableWidgetUsers.vue';
import api from '@/plugins/axios';
import { Modal } from 'bootstrap';

export default {
  components: {
    TableWidget
  },
  data() {
    return {
      columns: [
        {
          key: 'fullname',
          label: 'Name'
        },
        {
          key: 'email',
          label: 'Email'
        },
        {
          key: 'roles',
          label: 'Roles'
        },
      ],
    };
  },


  setup() {
    const tableData = ref([]);
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzM5MzMxMTQ1LCJleHAiOjE3MzkzMzQ3NDUsIm5iZiI6MTczOTMzMTE0NSwianRpIjoiUzNaTTVUNFRyN2Y2OE5CNCIsInN1YiI6IjllMmVmODNjLTk2YmMtNDZhMi04OTk0LTM0YTVjYWZiYzc5OCIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.oQf1kJzdSCOc0hVGc3a2XovfTVhTG_JMcyzPhKV0daw';
    const fetchData = async () => {
      try {
        const response = await api.get('/users', {
          headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
          }
        });
        tableData.value = response.data.result.map(user => ({
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          roles: user.roles.join(', ')
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    onMounted(fetchData);

    return {
      tableData
    };
  },
  methods: {
    navigateToRoute(routeName) {
      this.$router.push({ name: routeName });
    },
    deleteRow(id) {
      this.$swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .delete(`/api/data/${id}`)
            .then(() => {
              // Hapus dari array lokal jika diperlukan
              this.items = this.items.filter(item => item.id !== id);
              
              this.$swal.fire("Deleted!", "The row has been deleted.", "success");
            })
            .catch((error) => {
              console.error("Error deleting row:", error);
              this.$swal.fire("Error!", "Failed to delete the row.", "error");
            });
        }
      });
    },
    openNewPermissionModal() {
      const modalElement = this.$refs.newPermissionModal;
      const modalInstance = new Modal(modalElement);
      modalInstance.show();
    }


  }
};
</script>
<style scoped>
.modal-backdrop.show {
  background-color: rgba(0, 0, 0, 0.8) !important;
}
</style>
