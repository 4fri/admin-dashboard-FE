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
        <div class="card-body px-0">
          <div class="table-responsive">
            <table id="user-list-table" class="table table-striped" role="grid" data-toggle="data-table">
              <thead>
                <tr class="ligth">
                  <th>No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Roles</th>
                  <th style="min-width: 100px">Action</th>
                </tr>
              </thead>
              <tbody>
                <table-widget :list="tableData" />
              </tbody>
            </table>
          </div>
        </div>
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
  setup() {
    const tableData = ref([]);
    const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzM5MjM5MDcyLCJleHAiOjE3MzkyNDI2NzIsIm5iZiI6MTczOTIzOTA3MiwianRpIjoiT0RIdlJzbDZka2g0ZUROSiIsInN1YiI6IjllMmVjOTU1LTE2MWItNGY5Yy1iMDVjLTQxNGIwNDQ4N2FhNyIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.2mDyTXBPUpopO_8UFn9NFzNe8rvlZdpihoBMb54IP7U';
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
          name: user.fullname,
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
    }
  }
};
</script>
