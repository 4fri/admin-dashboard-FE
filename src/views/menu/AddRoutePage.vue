<template>
  <b-row>
    <b-col xl="12" lg="12">
      <b-card>
        <b-card-header class="d-flex justify-content-between">
          <div class="header-title">
            <h4 class="card-title">Add New Routes</h4>
          </div>
        </b-card-header>
        <b-card-body>
          <form @submit.prevent="submitForm">
            <div class="row g-3">
              
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label" for="name">Name</label>
                  <input v-model="form.name" type="text" class="form-control" id="name" placeholder="Name" required />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label" for="username">Method</label>
                  <input v-model="form.method" type="text" class="form-control" id="method" placeholder="Method" required />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label" for="text">Prefix</label>
                  <input v-model="form.prefix" type="text" class="form-control" id="prefix" placeholder="Prefix" required />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label" for="email">URL</label>
                  <input v-model="form.url" type="text" class="form-control" id="url" placeholder="URL" required />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label" for="email">Controller</label>
                  <input v-model="form.controller" type="text" class="form-control" id="controller" placeholder="Controller" required />
                </div>
              </div>

              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label" for="email">Function</label>
                  <input v-model="form.function" type="text" class="form-control" id="function" placeholder="Function" required />
                </div>
              </div>
            </div>
            <div class="d-grid gap-2 d-md-flex pt-2">
              <button type="button" class="btn btn-danger" @click="goBack">Back</button>
              <button type="submit" class="btn btn-primary" :disabled="passwordMismatch">Add New Routes</button>
            </div>
          </form>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import api from "@/plugins/axios";
import { useToast } from "vue-toastification"; // Impor useToast

export default {
  data() {
    return {
      form: {
        name: "",
        method: "",
        prefix: "",
        url: "",
        controller: "",
        function: ""
      },
      loadingRoutes: false,
      token: '',
    };
  },
  computed: {
    passwordMismatch() {
      return this.form.password && this.form.password_confirmation && this.form.password !== this.form.password_confirmation;
    }
  },
  created() {
    this.token =  localStorage.getItem('access_token');
  },
  methods: {
    async fetchRoles() {
      this.loadingRoutes = true;
      try {
        const response = await api.get('/roles', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.$token}`
          }
        });
        if (response.data.success) {
          this.roles = response.data.result.data.map(role => ({
            id: role.id,
            name: role.name
          }));
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        this.loadingRoutes = false;
      }
    },
    submitForm() {
      if (this.passwordMismatch) {
        const toast = useToast(); // Gunakan toast
        toast.error("Passwords do not match!"); // Tampilkan notifikasi error
        return;
      }
      this.createRoutes();
    },
    async createRoutes() {
      const toast = useToast(); // Gunakan toast

      try {
        const response = await api.post('/routes/store', {
          name: this.form.name,
          method: this.form.method,
          prefix: this.form.prefix,
          url: this.form.url,
          controller: this.form.controller,
          function: this.form.controller,
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`
          }
        });

        if (response.data.success) {
          console.log(response.data.success);
          
          this.$router.push('/route-list'); // Redirect ke halaman user list
          toast.success("Routes successfully added!"); // Tampilkan notifikasi sukses
        } else {
          // Tampilkan pesan error dari response API
          toast.error(response.data.message || "Failed to add user."); // Jika message tidak ada, gunakan pesan default
        }
      } catch (error) {
        console.error("Error adding user:", error);
        // Tampilkan pesan error dari response API jika ada
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message); // Ambil pesan error dari response
        } else {
          toast.error("An error occurred while adding the user."); // Pesan default jika tidak ada pesan error
        }
      }
    },

    goBack() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.fetchRoles();
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>