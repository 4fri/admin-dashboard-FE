<template>
  <section class="login-content" :style="{ backgroundImage: `url(${require('@/assets/images/dashboard/top-header1.png')})` }">
    <b-row class="m-0 align-items-center justify-content-center h-100">
      <b-col md="6" class="d-flex justify-content-center align-items-center">
        <b-card class="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card iq-auth-form">
          <h2 class="mb-2 text-center"><brand-logo class="w-sm-25 w-md-50 w-lg-75"></brand-logo></h2>
          <p class="text-center">Dashboard Monitoring System.</p>
          <form>
            <div class="row">
              <div class="col-lg-12">
                <div class="form-group">
                  <label for="email" class="form-label">Email</label>
                  <input type="email" class="form-control" id="email" aria-describedby="email" placeholder=" " />
                </div>
              </div>
              <div class="col-lg-12">
                <div class="form-group">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password" aria-describedby="password" placeholder=" " />
                </div>
              </div>
              <div class="col-lg-12 d-flex justify-content-between">
                <div class="form-check mb-3">
                  <input type="checkbox" class="form-check-input" id="customCheck1" />
                  <label class="form-check-label" for="customCheck1">Remember Me</label>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <a href="/dashboard" type="button" class="btn btn-primary">Sign In</a>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import api from "@/plugins/axios"; // Import axios dari file yang sudah kita buat

  const data = ref(null);

  const fetchData = async () => {
    try {
      const response = await api.get("/profile");
      data.value = response.data;
      console.log("Data fetched:", response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  onMounted(() => {
    fetchData();
  });
</script>

<style lang="scss" scoped>
  .login-content {
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>
