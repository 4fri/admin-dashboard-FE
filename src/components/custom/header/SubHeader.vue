<template>
  <div class="iq-navbar-header" style="height: 200px">
    <b-container fluid class="iq-container">
      <b-row>
        <b-col md="12">
          <div class="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <h1>Hello, {{ user.fullname }}!</h1>
              <p>Welcome Back To Your Dashboard Account.</p>
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
    <div class="iq-header-img">
      <img src="@/assets/images/dashboard/top-header.png" alt="header" class="theme-color-default-img img-fluid w-100 h-100 animated-scaleX" />
      <img src="@/assets/images/dashboard/top-header1.png" alt="header" class="theme-color-purple-img img-fluid w-100 h-100 animated-scaleX" />
      <img src="@/assets/images/dashboard/top-header2.png" alt="header" class="theme-color-blue-img img-fluid w-100 h-100 animated-scaleX" />
      <img src="@/assets/images/dashboard/top-header3.png" alt="header" class="theme-color-green-img img-fluid w-100 h-100 animated-scaleX" />
      <img src="@/assets/images/dashboard/top-header4.png" alt="header" class="theme-color-yellow-img img-fluid w-100 h-100 animated-scaleX" />
      <img src="@/assets/images/dashboard/top-header5.png" alt="header" class="theme-color-pink-img img-fluid w-100 h-100 animated-scaleX" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'SubHeader',
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    this.user = JSON.parse(localStorage.getItem('user'));
    // this.user = { fullname : 'Ahmad Fauzi Ganteng' };
  },
}
</script>
