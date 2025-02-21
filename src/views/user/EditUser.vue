<template>
  <b-row>
    <b-col xl="12" lg="12">
      <b-card>
        <b-card-header class="d-flex justify-content-between">
          <div class="header-title">
            <h4 class="card-title">{{ isEditing ? 'Edit User' : 'Add New User' }}</h4>
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
              <!-- Username -->
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label" for="username">Username</label>
                  <input v-model="form.username" type="text" class="form-control" id="username" placeholder="Username" required />
                </div>
              </div>

              <!-- Email -->
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label" for="email">Email</label>
                  <input v-model="form.email" type="email" class="form-control" id="email" placeholder="Email" required />
                </div>
              </div>

              <!-- User Role (vue-multiselect with axios) -->
              <div class="col-md-6">
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

              <!-- Password -->
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label" for="password">Password</label>
                  <input v-model="form.password" type="password" class="form-control" id="password" placeholder="Password" :required="!isEditing" />
                </div>
              </div>

              <!-- Repeat Password -->
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label" for="rpass">Repeat Password</label>
                  <input v-model="form.password_confirmation" type="password" class="form-control" id="rpass" placeholder="Repeat Password" :required="!isEditing" />
                  <small v-if="passwordMismatch" class="text-danger">Passwords do not match</small>
                </div>
              </div>

            </div>

            <!-- Submit Button -->
            <button type="submit" class="btn btn-primary" :disabled="passwordMismatch">{{ isEditing ? 'Update User' : 'Add New User' }}</button>
          </form>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import api from "@/plugins/axios";
import Multiselect from "vue-multiselect";
import { useToast } from "vue-toastification"; 

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      form: {
        id: null,
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        roles: []
      },
      roles: [],
      loadingRoles: false,
      token: '',
      isEditing: false,
    };
  },
  computed: {
    passwordMismatch() {
      return this.form.password && this.form.password_confirmation && this.form.password !== this.form.password_confirmation;
    }
  },
  created() {
    this.token = localStorage.getItem('access_token');
    const userId = this.$route.params.id;
    if (userId) {
      this.isEditing = true;
      this.fetchUser(userId);
    }
  },
  methods: {
    async fetchRoles() {
      console.log(this.token);
      this.loadingRoles = true;
      try {
        const response = await api.get('/roles', {
          headers: {
            'Content-Type': 'application/json',
            Authorization : `Bearer ${this.token}`
          }
        });
        if (response.data.success) {
          this.roles = response.data.result.roles.map(role => ({
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
    async fetchUser(userId) {
      try {
        const response = await api.get(`/users/${userId}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`
          }
        });
        if (response.data.success) {
          const user = response.data.result.user;
          this.form.id = user.id;
          this.form.name = user.fullname;
          this.form.username = user.username;
          this.form.email = user.email;
          this.form.roles = this.roles.filter(role => user.roles.includes(role.id));
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
    submitForm() {
      if (this.passwordMismatch) {
        const toast = useToast(); // Gunakan toast
        toast.error("Passwords do not match!"); // Tampilkan notifikasi error
        return;
      }
      if (this.isEditing) {
        this.updateUser();
      } else {
        this.createUser();
      }
    },
    async createUser() {
      const toast = useToast(); // Gunakan toast

      try {
        const response = await api.post('/users/store', {
          fullname: this.form.name,
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
          password_confirmation: this.form.password_confirmation,
          roles: this.form.roles.map(role => role.id)
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`
          }
        });

        if (response.data.success) {
          this.$router.push('/user-list'); // Redirect ke halaman user list
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
    async updateUser() {
      const toast = useToast(); // Gunakan toast

      try {
        const response = await api.put(`/users/${this.form.id}`, {
          fullname: this.form.name,
          username: this.form.username,
          email: this.form.email,
          password: this.form.password,
          password_confirmation: this.form.password_confirmation,
          roles: this.form.roles.map(role => role.id)
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`
          }
        });

        if (response.data.success) {
          this.$router.push('/user-list'); // Redirect ke halaman user list
          toast.success("User successfully updated!"); // Tampilkan notifikasi sukses
        } else {
          // Tampilkan pesan error dari response API
          toast.error(response.data.message || "Failed to update user."); // Jika message tidak ada, gunakan pesan default
        }
      } catch (error) {
        console.error("Error updating user:", error);
        // Tampilkan pesan error dari response API jika ada
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message); // Ambil pesan error dari response
        } else {
          toast.error("An error occurred while updating the user."); // Pesan default jika tidak ada pesan error
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
