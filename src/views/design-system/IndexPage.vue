<template>
  <span class="uisheet screen-darken"></span>
  <div id="main" class="header" :style="`background: url(${require('@/assets/images/dashboard/top-header1.png')}); background-size: cover; background-repeat: no-repeat; height: 100vh;position: relative;`">
    <div class="main-img">
      <b-container>
        <img src="@/assets/images/logo_sisi.webp" alt="Logo Sisi" class="logo-image" width="250">
        <h3 class="my-4 d-none d-md-block">
          <span class="text-muted">Dashboard Monitoring System</span>
        </h3>
         <div class="row g-4 justify-content-center align-items-center mt-4">
          <div class="col-md-4 d-flex">
            <div class="card border-0 flex-fill">
              <div class="card-body text-center d-flex flex-column">
                <h4 class="card-title"><b>ITAM Dashboard</b></h4>
                <p class="card-text mb-2 text-dark text-muted">Monitoring for Asset Management System</p>
                <router-link to="/dashboard" class="btn btn-primary btn-sm w-100 mt-3">
                  Go
                </router-link>
              </div>
            </div>
          </div>
          <div class="col-md-4 d-flex">
            <div class="card border-0 flex-fill">
              <div class="card-body text-center d-flex flex-column">
                <h4 class="card-title"><b>Ticketing Dashboard</b></h4>
                <p class="card-text mb-2 text-dark text-muted">Monitoring for ITOS Forca Ticketing System</p>
                <a href="#" class="btn btn-primary btn-sm w-100 mt-3">
                  Go
                </a>
              </div>
            </div>
          </div>
         </div>
      </b-container>
    </div>
    <b-container>
      <nav class="nav navbar navbar-expand-lg navbar-light top-1 rounded">
        <b-container fluid>
          <a class="navbar-brand mx-2" href="#">
            <img src="../../assets/images/logo_sisi.webp" alt="Logo Sisi" class="logo-sisi" width="70">

          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-2" aria-controls="navbar-2" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbar-2">
            <ul class="mb-2 navbar-nav ms-auto align-items-center navbar-list mb-lg-0">
              <li class="nav-item dropdown">
                <a class="nav-link py-0 d-flex align-items-center" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="@/assets/images/avatars/01.png" alt="User-Profile" class="theme-color-default-img img-fluid avatar avatar-50 avatar-rounded" />
                  <img src="@/assets/images/avatars/avtar_1.png" alt="User-Profile" class="theme-color-purple-img img-fluid avatar avatar-50 avatar-rounded" />
                  <img src="@/assets/images/avatars/avtar_2.png" alt="User-Profile" class="theme-color-blue-img img-fluid avatar avatar-50 avatar-rounded" />
                  <img src="@/assets/images/avatars/avtar_4.png" alt="User-Profile" class="theme-color-green-img img-fluid avatar avatar-50 avatar-rounded" />
                  <img src="@/assets/images/avatars/avtar_5.png" alt="User-Profile" class="theme-color-yellow-img img-fluid avatar avatar-50 avatar-rounded" />
                  <img src="@/assets/images/avatars/avtar_3.png" alt="User-Profile" class="theme-color-pink-img img-fluid avatar avatar-50 avatar-rounded" />
                  <div class="caption ms-3 d-none d-md-block">
                    <h6 class="mb-0 caption-title">Ahmad Fauzi</h6>
                    <p class="mb-0 caption-sub-title">Leader NOC</p>
                  </div>
                </a>
                <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><router-link class="dropdown-item" :to="{ name: 'default.user-profile' }">Profile</router-link></li>
                  <li><router-link class="dropdown-item" :to="{ name: 'default.user-privacy-setting' }">Privacy Setting</router-link></li>
                  <li><hr class="dropdown-divider" /></li>
                  <li><router-link class="dropdown-item" :to="{ name: 'auth.login' }">Logout</router-link></li>
                </ul>
              </li>
            </ul>
          </div>
        </b-container>
      </nav>
    </b-container>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  setup() {
    const store = useStore()
    const appName = computed(() => store.getters['setting/app_name'])
    const show = ref(false)
    return {
      appName,
      show
    }
  }
}
</script>

<style scoped>
@media (max-width: 576px) {
  .logo-image {
    width: 250px;
    margin-top: 100px;
  }
}
</style>