<template>
  <!--Logo start-->
  <div class="logo-main">
    <img src="../../../assets/images/logo_sisi.webp" alt="Logo Sisi" class="logo-image">
    <!-- <svg :class="`${color ? 'text-primary' : ''}`" width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="-0.757324" y="19.2427" width="28" height="4" rx="2" transform="rotate(-45 -0.757324 19.2427)" fill="currentColor" />
      <rect x="7.72803" y="27.728" width="28" height="4" rx="2" transform="rotate(-45 7.72803 27.728)" fill="currentColor" />
      <rect x="10.5366" y="16.3945" width="16" height="4" rx="2" transform="rotate(45 10.5366 16.3945)" fill="currentColor" />
      <rect x="10.5562" y="-0.556152" width="28" height="4" rx="2" transform="rotate(45 10.5562 -0.556152)" fill="currentColor" />
    </svg> -->
  </div>
  <!--Logo End-->
</template>

<script>
export default {
  props: {
    color: { type: Boolean, default: false }
  }
}
</script>

<style scoped>
.logo-main {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%; /* Pastikan logo-main mengambil seluruh lebar */
}

.logo-image {
  width: 50px; /* Ukuran default */
  height: auto; /* Biarkan tinggi menyesuaikan dengan aspek rasio */
  max-width: 100%; /* Pastikan gambar tidak melebihi lebar kontainer */
}

/* Media Queries untuk Responsivitas */
@media (min-width: 768px) {
  .logo-image {
    width: 60px; /* Ukuran lebih besar untuk perangkat tablet ke atas */
  }
}

@media (min-width: 1024px) {
  .logo-image {
    width: 70px;
  }
}
</style>
