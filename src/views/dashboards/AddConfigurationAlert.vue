<template>
  <b-row>
    <b-col xl="12" lg="12">
      <b-card>
        <b-card-header class="d-flex justify-content-between">
          <div class="header-title">
            <h4 class="card-title">Add New Alert</h4>
          </div>
        </b-card-header>
        <b-card-body>
          <form @submit.prevent="createAlert">
            <div class="d-flex flex-column gap-3">
              <!-- Connection -->
              <div>
                <label class="form-label" for="connection">Connection</label>
                <multiselect 
                  v-model="form.connection" 
                  :options="connections" 
                  :multiple="false" 
                  :close-on-select="true" 
                  :clear-on-select="true" 
                  :preserve-search="true"
                  placeholder="Select Connection"
                  label="connection"
                  track-by="connection"
                  class="form-control"
                  @select="fetchCategory"
                />
              </div>
          
              <!-- Category -->
              <div>
                <label class="form-label" for="category">Category</label>
                <multiselect 
                  v-model="form.category" 
                  :options="tables" 
                  :multiple="false" 
                  :close-on-select="true" 
                  :clear-on-select="true" 
                  :preserve-search="true"
                  placeholder="Select Category"
                  label="tableName"
                  track-by="tableName"
                  class="form-control"
                />
              </div>
          
              <!-- Days (Dynamic Input) -->
              <div>
                <label class="form-label">Days</label>
                <div v-for="(day, index) in form.days" :key="index" class="d-flex align-items-center gap-2">
                  <input type="text" class="form-control mb-2" v-model="form.days[index]" placeholder="Enter Days">
                  <a href="#" @click.prevent="removeDay(index)">❌</a>
                </div>
                <div>
                  <a href="#" @click.prevent="addDay">Tambahkan Hari Notifikasi</a>
                </div>
              </div>
          
              <!-- Status -->
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="form.status">
                <label class="form-check-label" for="flexSwitchCheckDefault">Status</label>
              </div>
          
             <!-- Submit Button -->
              <div class="d-flex justify-content-center">
                <button type="submit" class="btn btn-primary w-50">Add</button>
              </div>
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

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      form: {
        connection : '',
        category : '',
        days: [''],
        status : false
      },
      connections: [],
      tables : [],
      loadingConnection: false,
      token: '',
    };
  },
  created() {
    this.token = localStorage.getItem('access_token');
  },
  methods: {
    async fetchConnection() {
      this.loadingConnection = true;
      try {
        const response = await api.get('/configurations/alerts/connection-filter', {
          headers: {
            'Content-Type': 'application/json',
            Authorization : `Bearer ${this.token}`
          }
        });
        if (response.data.success) {
          this.connections = response.data.result.connections.map(alert => ({
            connection: alert.connection
          }));
        }
      } catch (error) {
        console.error("Error fetching Connection:", error);
      } finally {
        this.loadingConnection = false;
      }
    },
    async fetchCategory() {
      if (!this.form.connection.connection) return;
      this.loadingConnection = true;
      try {
        const response = await api.get(`/configurations/alerts/connection-filter?connection=${this.form.connection.connection}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization : `Bearer ${this.token}`
          }
        });
        console.log(response.data);
        if (response.data.success) {
          this.tables = response.data.result.tables.map(table => ({
            tableName: table.tableName
          }));
        }
      } catch (error) {
        console.error("Error fetching Categories:", error);
      } finally {
        this.loadingConnection = false;
      }
    },
    addDay() {
      this.form.days.push(''); // Tambah input kosong ke array days
    },
    removeDay(index) {
      this.form.days.splice(index, 1); // Hapus input berdasarkan index
    },
    async createAlert(){
      
      this.form.days = this.form.days.map(day => parseInt(day, 10));
      try {
        const response = await api.post('/configurations/alerts/store', {
          db_connection: this.form.connection.connection,
          table_name: this.form.category.tableName,
          day_remaining: this.form.days,
          status_active: this.form.status
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.token}`
          }
        });

        if (response.data.success) {
          this.$router.push('/configuration-alert'); // Redirect ke halaman user list
          this.$toast.success("Alert successfully added!"); // Tampilkan notifikasi sukses
        } else {
          // Tampilkan pesan error dari response API
          this.$toast.error(response.data.message || "Failed to add Alert."); // Jika message tidak ada, gunakan pesan default
        }
      } catch (error) {
        console.error("Error adding Alert:", error);
        // Tampilkan pesan error dari response API jika ada
        if (error.response && error.response.data && error.response.data.message) {
          this.$toast.error(error.response.data.message); // Ambil pesan error dari response
        } else {
          this.$toast.error("An error occurred while adding the user."); // Pesan default jika tidak ada pesan error
        }
      }
    }
  },
  mounted() {
    this.fetchConnection();
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>