import { createRouter, createWebHistory } from 'vue-router'

// Design System Routes
const designSystemChildRoutes = (prefix) => [
  {
    path: '/landingPage',
    name: prefix + '.main',
    meta: { auth: true, name: 'Design System' },
    component: () => import('@/views/design-system/IndexPage.vue')
  }
]
// Auth Default Routes
const authChildRoutes = (prefix) => [
  {
    path: 'login',
    name: prefix + '.login',
    meta: { auth: false, name: 'Login' },
    component: () => import('@/views/auth/default/SignIn.vue')
  },
  {
    path: 'register',
    name: prefix + '.register',
    meta: { auth: false, name: 'Register' },
    component: () => import('@/views/auth/default/SignUp.vue')
  },
  {
    path: 'reset-password',
    name: prefix + '.reset-password',
    meta: { auth: false, name: 'Reset Password' },
    component: () => import('@/views/auth/default/ResetPassword.vue')
  },
  {
    path: 'varify-email',
    name: prefix + '.varify-email',
    meta: { auth: false, name: 'Varify Email' },
    component: () => import('@/views/auth/default/VarifyEmail.vue')
  },
  {
    path: 'lock-screen',
    name: prefix + '.lock-screen',
    meta: { auth: false, name: 'Lock Screen' },
    component: () => import('@/views/auth/default/LockScreen.vue')
  }
]

// Dashboard routes
const dashboardRoutes = (prefix) => [
  {
    path: '',
    name: prefix + '.dashboard',
    meta: { auth: true, name: 'Home', isBanner: false },
    component: () => import('@/views/dashboards/IndexPage.vue')
  }
]
// Default routes
const defaultChildRoutes = (prefix) => [
  {
    path: '',
    name: prefix + '.dashboard',
    meta: { auth: true, name: 'Home', isBanner: true },
    component: () => import('@/views/dashboards/IndexPage.vue')
  },
  {
    path: '/alerting',
    name: prefix + '.alerting',
    meta: { auth: true, name: 'Alerting Dashboard', isBanner: true },
    component: () => import('@/views/dashboards/AlertingDashboard.vue')
  },
  {
    path: '/configuration-alert',
    name: prefix + '.configuration-alert',
    meta: { auth: true, name: 'Configuration Alert', isBanner: true },
    component: () => import('@/views/dashboards/ConfigurarionAlert.vue')
  },
  {
    path: '/alert-add',
    name: prefix + '.alert-add',
    meta: { auth: true, name: 'User Add', isBanner: true },
    component: () => import('@/views/dashboards/AddConfigurationAlert.vue')
  },
  {
    path: '/alert-edit/:id',
    name: prefix + '.alert-edit',
    meta: { auth: true, name: 'Alert Edit', isBanner: true },
    component: () => import('@/views/dashboards/EditConfigurationAlert.vue')
  },
  // Users Pages
  {
    path: '/user-list',
    name: prefix + '.user-list',
    meta: { auth: true, name: 'User List', isBanner: true },
    component: () => import('@/views/user/ListPage.vue')
  },
  {
    path: '/menu-list',
    name: prefix + '.menu-list',
    meta: { auth: true, name: 'Menu List', isBanner: true },
    component: () => import('@/views/menu/ListPageMenu.vue')
  },
  {
    path: '/route-list',
    name: prefix + '.route-list',
    meta: { auth: true, name: 'Route List', isBanner: true },
    component: () => import('@/views/menu/ListPageRoute.vue')
  },
  {
    path: '/user-add',
    name: prefix + '.user-add',
    meta: { auth: true, name: 'User Add', isBanner: true },
    component: () => import('@/views/user/AddPage.vue')
  },
  {
    path: '/user-edit/:id',
    name: 'prefix.user-edit',
    meta: { auth: true, name: 'User Edit', isBanner: true },
    component: () => import('@/views/user/EditUser.vue')
  },
  {
    path: '/route-add',
    name: prefix + '.route-add',
    meta: { auth: true, name: 'Route Add', isBanner: true },
    component: () => import('@/views/menu/AddRoutePage.vue')
  },
  {
    path: '/route-edit/:id',
    name: 'prefix.route-edit',
    meta: { auth: true, name: 'Route Edit', isBanner: true },
    component: () => import('@/views/menu/EditRoutePage.vue')
  },
  {
    path: '/user-profile',
    name: prefix + '.user-profile',
    meta: { auth: true, name: 'User Add', isBanner: true },
    component: () => import('@/views/user/ProfilePage.vue')
  },
  {
    path: '/privacy-setting',
    name: prefix + '.user-privacy-setting',
    meta: { auth: true, name: 'Privacy Setting', isBanner: true },
    component: () => import('@/views/user/PrivacySetting.vue')
  },
  // Map Pages
  {
    path: '/map-google',
    name: prefix + '.map-google',
    meta: { auth: true, name: 'Google Map', isBanner: true },
    component: () => import('@/views/maps/GooglePage.vue')
  },
  {
    path: '/map-vector',
    name: prefix + '.map-vector',
    meta: { auth: true, name: 'Vector Map', isBanner: true },
    component: () => import('@/views/maps/VectorPage.vue')
  },
  // Form Pages
  {
    path: '/elements',
    name: prefix + '.elements',
    meta: { auth: true, name: 'Elements', isBanner: true },
    component: () => import('@/views/forms/ElementsPage.vue')
  },
  {
    path: '/validation',
    name: prefix + '.validation',
    meta: { auth: true, name: 'Validation', isBanner: true },
    component: () => import('@/views/forms/ValidationPage.vue')
  },
  {
    path: '/wizard',
    name: prefix + '.wizard',
    meta: { auth: true, name: 'Wizard', isBanner: true },
    component: () => import('@/views/forms/WizardPage.vue')
  },
  // Table Pages
  {
    path: '/bootstrap-table',
    name: prefix + '.bootstrap-table',
    meta: { auth: true, name: 'Botstrap Table', isBanner: true },
    component: () => import('@/views/tables/BootstrapTable.vue')
  },
  {
    path: '/datatable',
    name: prefix + '.data-table',
    meta: { auth: true, name: 'Data Table', isBanner: true },
    component: () => import('@/views/tables/DataTable.vue')
  },
  // Icons Pages
  {
    path: '/icons/solid',
    name: prefix + '.icons.solid',
    meta: { auth: true, name: 'Solid Icon', isBanner: true },
    component: () => import('@/views/icons/SolidIcon.vue')
  },
  {
    path: '/icons/outlined',
    name: prefix + '.icons.outlined',
    meta: { auth: true, name: 'Outlined Icon', isBanner: true },
    component: () => import('@/views/icons/OutlinedIcon.vue')
  },
  {
    path: '/icons/dual-tone',
    name: prefix + '.icons.dual-tone',
    meta: { auth: true, name: 'Dual Tone Icon', isBanner: true },
    component: () => import('@/views/icons/DualToneIcon.vue')
  },
  // Extra Pages
  {
    path: '/privacy-policy',
    name: prefix + '.privacy-policy',
    meta: { auth: true, name: 'Privacy Policy', isBanner: true },
    component: () => import('@/views/extra/PrivacyPolicy.vue')
  },
  {
    path: '/terms-and-conditions',
    name: prefix + '.terms-and-conditions',
    meta: { auth: true, name: 'Terms and Conditions', isBanner: true },
    component: () => import('@/views/extra/TermsAndConditions.vue')
  },
  {
    path: '/admin-permissions',
    name: prefix + '.admin-permissions',
    meta: { auth: true, name: 'Admin Permissions', isBanner: true },
    component: () => import('@/views/admin/AdminPage.vue')
  }
]

const errorRoutes = (prefix) => [
  // Error Pages
  {
    path: '404',
    name: prefix + '.404',
    meta: { auth: true, name: 'Error 404', isBanner: true },
    component: () => import('@/views/errors/Error404Page.vue')
  },
  {
    path: '500',
    name: prefix + '.500',
    meta: { auth: true, name: 'Error 500', isBanner: true },
    component: () => import('@/views/errors/Error500Page.vue')
  },
  {
    path: 'maintenance',
    name: prefix + '.maintenance',
    meta: { auth: true, name: 'Maintenance', isBanner: true },
    component: () => import('@/views/errors/MaintenancePage.vue')
  }
]

const landingPageRoutes = (prefix) => [
  {
    path: '',
    name: prefix + 'landing-page',
    meta: { auth: true, name: 'Landing Page', isBanner: true, header: 'header_two', footer: 'footer' },
    component: () => import('@/views/modules/landing-pages/LandingPage.vue')
  }
]

const routes = [
  {
    path: '/',
    name: 'design-system',
    component: () => import('../layouts/guest/BlankLayout.vue'),
    children: designSystemChildRoutes('design-system')
  },
  //landing pages
  {
    path: '/landing-page',
    name: 'landing-page',
    component: () => import('../layouts/LandingPageLayout.vue'),
    children: landingPageRoutes('landing-page')
  },
  // Default Pages
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../layouts/DefaultLayout.vue'),
    children: defaultChildRoutes('default')
  },
  // Menu Styles
  {
    path: '/horizontal',
    name: 'horizontal',
    component: () => import('../layouts/menu-styles/HorizontalLayout.vue'),
    children: dashboardRoutes('horizontal')
  },
  {
    path: '/dual-horizontal',
    name: 'dual-horizontal',
    component: () => import('../layouts/menu-styles/DualHorizontalLayout.vue'),
    children: dashboardRoutes('dual-horizontal')
  },
  {
    path: '/dual-compact',
    name: 'dual-compact',
    component: () => import('../layouts/menu-styles/DualCompactLayout.vue'),
    children: dashboardRoutes('dual-compact')
  },
  {
    path: '/boxed',
    name: 'boxed',
    component: () => import('../layouts/menu-styles/BoxedLayout.vue'),
    children: dashboardRoutes('boxed')
  },
  {
    path: '/boxed-fancy',
    name: 'boxed-fancy',
    component: () => import('../layouts/menu-styles/BoxedFancyLayout.vue'),
    children: dashboardRoutes('boxed-fancy')
  },

  // Auth Skins
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../layouts/guest/BlankLayout.vue'),
    children: authChildRoutes('auth')
  },
  // Errors Pages
  {
    path: '/errors',
    name: 'errors',
    component: () => import('../layouts/guest/BlankLayout.vue'),
    children: errorRoutes('errors')
  }
]

const router = createRouter({
  linkActiveClass: 'active',
  linkExactActiveClass: 'exact-active',
  history: createWebHistory(process.env.BASE_URL),
  base: process.env.BASE_URL,
  routes
})

// Middleware navigasi
router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem('access_token')
  const expiryTime = localStorage.getItem('expiry_time')
  const isAuthenticated = accessToken !== null

  // Cek apakah session expired
  if (expiryTime && Date.now() > Number(expiryTime)) {
    console.log('Session expired, logging out...')
    localStorage.removeItem('access_token')
    localStorage.removeItem('user')
    localStorage.removeItem('expiry_time')

    if (to.meta.auth) {
      return next({ name: 'auth.login' }) // Redirect ke login jika rute butuh autentikasi
    }
  }

  // Cek jika user mengakses halaman yang butuh autentikasi
  if (to.meta.auth && !isAuthenticated) {
    return next({ name: 'auth.login' }) // Redirect ke login jika tidak ada token
  }

  next() // Lanjutkan ke halaman yang diminta
})

export default router
