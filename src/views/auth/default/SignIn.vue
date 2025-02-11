<template>
  <section class="login-content" :style="{ backgroundImage: `url(${require('@/assets/images/dashboard/top-header1.png')})` }">
    <b-row class="m-0 align-items-center justify-content-center h-100">
      <b-col md="6" class="d-flex justify-content-center align-items-center">
        <b-card class="card-transparent shadow-none d-flex justify-content-center mb-0 auth-card iq-auth-form">
          <h2 class="mb-2 text-center">
            <brand-logo class="w-sm-25 w-md-50 w-lg-75"></brand-logo>
          </h2>
          <b-form @submit.prevent="handleLogin">
            <b-form-group label="Email" label-for="email">
              <b-form-input
                id="email"
                v-model="email"
                type="email"
                required
                placeholder="Masukkan email Anda"
                :state="emailState"
              ></b-form-input>
              <b-form-invalid-feedback>Email tidak valid.</b-form-invalid-feedback>
            </b-form-group>

            <b-form-group label="Password" label-for="password">
              <b-form-input
                id="password"
                v-model="password"
                type="password"
                required
                placeholder="Masukkan password Anda"
                :state="passwordState"
              ></b-form-input>
              <b-form-invalid-feedback>Password tidak boleh kosong.</b-form-invalid-feedback>
            </b-form-group>

            <b-button type="submit" variant="primary" class="w-100">Login</b-button>

            <div v-if="errorMessage" class="text-danger text-center mt-2">{{ errorMessage }}</div>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router"; // Impor useRouter
import api from "@/plugins/axios"; // Import axios dari file yang sudah kita buat

const router = useRouter(); // Inisialisasi router

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const emailState = computed(() => {
  return email.value.length > 0 ? true : null;
});

const passwordState = computed(() => {
  return password.value.length > 0 ? true : null;
});

const handleLogin = async () => {
  errorMessage.value = ''; // Reset error message
  try {
    const response = await api.post('/login', {
      email: email.value,
      password: password.value
    });

    if (response.status !== 200) {
      throw new Error('Login gagal. Periksa email dan password Anda.');
    }

    const data = response.data;
    // Simpan token atau data pengguna sesuai kebutuhan
    localStorage.setItem('access_token', data.access_token); // Simpan token di localStorage
    localStorage.setItem('user', JSON.stringify(data.user)); // Simpan data user di localStorage
    console.log('Login berhasil:', data);
    // Redirect ke halaman landingPage
    router.push({ path: '/landingPage' });
  } catch (error) {
    errorMessage.value = error.message;
  }
};
</script>

<style lang="scss" scoped>
.login-content {
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
