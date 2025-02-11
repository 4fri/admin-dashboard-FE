<template>
  <b-row>
    <b-col xl="12" lg="12">
      <b-card>
        <b-card-header class="d-flex justify-content-between">
          <div class="header-title">
            <h4 class="card-title">Add New User</h4>
          </div>
        </b-card-header>
        <b-card-body>
          <form @submit.prevent="submitForm">
            <div class="row g-3">
              <!-- Fullname -->
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label" for="name">Fullname</label>
                  <input v-model="form.name" type="text" class="form-control" id="name" placeholder="Name" required />
                </div>
              </div>

              <!-- Email -->
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label" for="email">Email</label>
                  <input v-model="form.email" type="email" class="form-control" id="email" placeholder="Email" required />
                </div>
              </div>

              <!-- Password -->
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label" for="password">Password</label>
                  <input v-model="form.password" type="password" class="form-control" id="password" placeholder="Password" required />
                </div>
              </div>

              <!-- Repeat Password -->
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label" for="rpass">Repeat Password</label>
                  <input v-model="form.password_confirmation" type="password" class="form-control" id="rpass" placeholder="Repeat Password" required />
                  <small v-if="passwordMismatch" class="text-danger">Passwords do not match</small>
                </div>
              </div>

              <!-- User Role (vue-multiselect with axios) -->
              <div class="col-md-12">
                <div class="form-group">
                  <label class="form-label">User Role</label>
                  <multiselect 
                    v-model="form.roles" 
                    :options="roles" 
                    :multiple="true" 
                    :close-on-select="false" 
                    :clear-on-select="false" 
                    :preserve-search="true"
                    placeholder="Select roles"
                    label="name"
                    track-by="id"
                    class="form-control"
                  />
                  <small v-if="loadingRoles" class="text-muted">Loading roles...</small>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary" :disabled="passwordMismatch">Add New User</button>
          </form>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import api from "@/plugins/axios";
import Multiselect from "vue-multiselect";
import { useToast } from "vue-toastification"; // Impor useToast

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        roles: []
      },
      roles: [],
      loadingRoles: false
    };
  },
  computed: {
    passwordMismatch() {
      return this.form.password && this.form.password_confirmation && this.form.password !== this.form.password_confirmation;
    }
  },
  methods: {
    async fetchRoles() {
      this.loadingRoles = true;
      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzM5MjQ1NzI4LCJleHAiOjE3MzkyNDkzMjgsIm5iZiI6MTczOTI0NTcyOCwianRpIjoiak9vUlZQMnhaeFlvVkFMMyIsInN1YiI6IjllMmVmODNjLTk2YmMtNDZhMi04OTk0LTM0YTVjYWZiYzc5OCIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.nlI1hqX4XOkwqGqk0ll1nf3z2wZNTIkJOQ8x-SsdXxo';
      try {
        const response = await api.get("/roles", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (response.data.success) {
          this.roles = response.data.result.map(role => ({
            id: role.id,
            name: role.name
          }));
        }
      } catch (error) {
        console.error("Error fetching roles:", error);
      } finally {
        this.loadingRoles = false;
      }
    },
    submitForm() {
      if (this.passwordMismatch) {
        const toast = useToast(); // Gunakan toast
        toast.error("Passwords do not match!"); // Tampilkan notifikasi error
        return;
      }
      this.createUser();
    },
    async createUser() {
      const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvYXBpL2xvZ2luIiwiaWF0IjoxNzM5MjQ1NzI4LCJleHAiOjE3MzkyNDkzMjgsIm5iZiI6MTczOTI0NTcyOCwianRpIjoiak9vUlZQMnhaeFlvVkFMMyIsInN1YiI6IjllMmVmODNjLTk2YmMtNDZhMi04OTk0LTM0YTVjYWZiYzc5OCIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.nlI1hqX4XOkwqGqk0ll1nf3z2wZNTIkJOQ8x-SsdXxo';
      const toast = useToast(); // Gunakan toast

      try {
        const response = await api.post('/users/store', {
          fullname: this.form.name,
          email: this.form.email,
          password: this.form.password,
          password_confirmation: this.form.password_confirmation,
          roles: this.form.roles.map(role => role.id)
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          toast.success("User successfully added!"); // Tampilkan notifikasi sukses
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
  },
  mounted() {
    this.fetchRoles();
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>