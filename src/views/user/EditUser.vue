<template>
  <b-row>
    <b-col xl="12" lg="12">
      <b-card>
        <b-card-header class="d-flex justify-content-between">
          <div class="header-title">
            <h4 class="card-title">Edit User</h4>
          </div>
        </b-card-header>
        <b-card-body>
          <form @submit.prevent="updateForm">
            <div class="row g-3">
              <!-- Fullname -->
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label" for="name">Fullname</label>
                  <input v-model="form.fullname" type="text" class="form-control" id="fullname" placeholder="Name" required />
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
                    id="roles"
                  />
                  <small v-if="loadingRoles" class="text-muted">Loading roles...</small>
                  <small v-else-if="roles.length === 0" class="text-warning">No roles available.</small>
                </div>
              </div>

              <!-- Password -->
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label" for="password">Password</label>
                  <input v-model="form.password" type="password" class="form-control" id="password" placeholder="Password" />
                </div>
              </div>

              <!-- Repeat Password -->
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label" for="rpass">Repeat Password</label>
                  <input v-model="form.password_confirmation" type="password" class="form-control" id="rpass" placeholder="Repeat Password" />
                  <small v-if="passwordMismatch" class="text-danger">Passwords do not match</small>
                </div>
              </div>
            </div>
            <div class="d-grid gap-2 d-md-flex pt-2">
              <button type="button" class="btn btn-danger" @click="goBack">Back</button>
              <button type="submit" class="btn btn-primary" :disabled="passwordMismatch">Update User</button>
            </div>
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
        fullname: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        roles: []
      },
      roles: [],
      loadingRoles: false,
      token: '',
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
      this.fetchUser(userId);
    }
  },
  methods: {
    async fetchRoles() {
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
        const response = await api.get(`/users/${userId}/show`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`
          }
        });

        if (response.data.success && response.data.result) {
          const user = response.data.result;
          this.form.id = user.id; 
          this.form.fullname = user.fullname;
          this.form.username = user.username;
          this.form.email = user.email;
          this.form.roles = user.roles.map(role => ({
            id: role.id,
            name: role.name
          }))
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
    
    async updateForm() {
      const toast = useToast();
      try {
        const response = await api.put(`/users/${this.form.id}/update`, {
          fullname: this.form.fullname,
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
          this.$router.push('/user-list'); 
          toast.success("User successfully updated!"); 
        } else {
          toast.error(response.data.message || "Failed to update user."); 
        }
      } catch (error) {
        console.error("Error updating user:", error);
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message); 
        } else {
          toast.error("An error occurred while updating the user."); 
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
