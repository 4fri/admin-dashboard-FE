<template>
  <b-row>
    <b-col xl="12" lg="12">
      <b-card>
        <b-card-header class="d-flex justify-content-between">
          <div class="header-title">
            <h4 class="card-title">Edit Routes</h4>
          </div>
        </b-card-header>
        <b-card-body>
          <form @submit.prevent="updateRoute">
            <div class="row g-3">
              
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label" for="name">Name</label>
                  <input v-model="routeData.name" type="text" class="form-control" id="name" placeholder="Name" required />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label" for="method">Method</label>
                  <input v-model="routeData.method" type="text" class="form-control" id="method" placeholder="Method" required />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label" for="prefix">Prefix</label>
                  <input v-model="routeData.prefix" type="text" class="form-control" id="prefix" placeholder="Prefix" required />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label" for="url">URL</label>
                  <input v-model="routeData.url" type="text" class="form-control" id="url" placeholder="URL" required />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label" for="controller">Controller</label>
                  <input v-model="routeData.controller" type="text" class="form-control" id="controller" placeholder="Controller" required />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label" for="function">Function</label>
                  <input v-model="routeData.function" type="text" class="form-control" id="function" placeholder="Function" required />
                </div>
              </div>
            </div>
            <div class="d-grid gap-2 d-md-flex pt-2">
              <button type="button" class="btn btn-danger" @click="goBack">Back</button>
              <button type="submit" class="btn btn-primary">Update Route</button>
            </div>
          </form>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import api from "@/plugins/axios";

export default {
  data() {
    return {
      routeId: this.$route.params.id,  // Ambil ID dari parameter URL
      routeData: {
        id: '',
        name: '',
        method: '',
        url: '',
        prefix: '',
        controller: '',
        function: '',
      },
      loadingRoutes: false,
      token: '',
    };
  },
  created() {
    this.token = localStorage.getItem('access_token');
    const routeId = this.$route.params.id;
    if (routeId) {
      this.fetchRouteData(routeId);  // Ambil data route berdasarkan ID
    } else {
      this.$toast.error('Route ID not found');
    }
  },
  methods: {
    // Ambil data route berdasarkan ID
    async fetchRouteData(routeId) {
      this.loadingRoutes = true;
      try {
        const response = await api.get(`/routes/${routeId}/show`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`,
          },
        });

        if (response.data.success && response.data.result) {
          const routeForm = response.data.result;
          this.routeData = {
            id: routeForm.id,
            name: routeForm.name,
            method: routeForm.method,
            url: routeForm.url,
            prefix: routeForm.prefix,
            controller: routeForm.controller,
            function: routeForm.function,
          };
          // this.routeData = response.data.result.route;
        } else {
          this.$toast.error('Failed to fetch route data.');
        }
      } catch (error) {
        console.error('Error fetching route data:', error);
        this.$toast.error('An error occurred while fetching route data.');
      } finally {
        this.loadingRoutes = false;
      }
    },

    // Update data route
    async updateRoute() {
      try {
        const response = await api.put(`/routes/${this.routeData.id}/update`, this.routeData, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`,
          },
        });

        if (response.data.success) {
          this.$router.push('/route-list'); // Redirect back to route list
          this.$toast.success('Route successfully updated!');
        } else {
          this.$toast.error('Failed to update route.');
        }
      } catch (error) {
        console.error('Error updating route:', error);
        this.$toast.error('An error occurred while updating the route.');
      }
    },

    // Fungsi untuk kembali ke halaman sebelumnya
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
