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
        <TableWidget 
         :rows="tableData" 
         :columns="columns"
         :buttonEdit="{ visible: true, disable: false }"
          :buttonDelete="{ visible: true, disable: false }"
          @delete="deleteRow"
         />
      </div>
    </b-col>
  </b-row>
</template>
<script>
import { ref, onMounted } from 'vue';
import TableWidget from '@/components/widgets/users/TableWidgetUsers.vue';
import api from '@/plugins/axios';

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
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzM5MzI0MjUyLCJleHAiOjE3MzkzMjc4NTIsIm5iZiI6MTczOTMyNDI1MiwianRpIjoiMnBnT0wwTU00OEVXWVp1TCIsInN1YiI6IjllMmVmODNjLTk2YmMtNDZhMi04OTk0LTM0YTVjYWZiYzc5OCIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.fMnY9IjoiVtb_EPisnPNdbWe3M6-5boNeKph7_EvsJI';
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
}


  }
};
</script>
