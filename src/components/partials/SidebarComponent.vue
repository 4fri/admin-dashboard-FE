<template>
  <!-- Sidebar Component Start Here-->
  <default-sidebar>
    <ul class="navbar-nav iq-main-menu" id="sidebar-menu">
      <side-menu title="Home" :static-item="true"></side-menu>
      <side-menu isTag="router-link" title="Dashboard" icon="view-grid" :route="{ to: 'default.dashboard' }"></side-menu>
      <side-menu isTag="router-link" title="Alert" icon="view-grid" :route="{ to: 'default.alerting' }"></side-menu>
      <li><hr class="hr-horizontal" /></li>
      <side-menu title="User Management" :static-item="true"></side-menu>
      <side-menu title="Users" icon="user-group" toggle-id="users" :caret-icon="true" :route="{ popup: 'false', to: 'user' }" @onClick="toggle" :active="currentRoute.includes('user')">
        <b-collapse tag="ul" class="sub-nav" id="users" accordion="sidebar-menu" :visible="currentRoute.includes('user')">
          <side-menu isTag="router-link" title="User Profile" icon="circle" :icon-size="10" icon-type="solid" miniTitle="UP" :route="{ to: 'default.user-profile' }"></side-menu>
          <side-menu isTag="router-link" title="User List" icon="circle" :icon-size="10" icon-type="solid" miniTitle="UL" :route="{ to: 'default.user-list' }"></side-menu>
          <side-menu isTag="router-link" title="Menu List" icon="circle" :icon-size="10" icon-type="solid" miniTitle="UL" :route="{ to: 'default.menu-list' }"></side-menu>
          <side-menu isTag="router-link" title="Route List" icon="circle" :icon-size="10" icon-type="solid" miniTitle="UL" :route="{ to: 'default.route-list' }"></side-menu>
          <side-menu isTag="router-link" title="Role" icon="circle" :icon-size="10" icon-type="solid" miniTitle="RL" :route="{ to: 'default.admin-permissions' }"></side-menu>
        </b-collapse>
      </side-menu>
    </ul>
  </default-sidebar>
</template>
<script setup>
import DefaultSidebar from '@/components/custom/sidebar/DefaultSidebar.vue'
import SideMenu from '@/components/custom/nav/SideMenu.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const currentRoute = ref('')
const route = useRoute()
const toggle = (route) => {
  if (route === currentRoute.value && route.includes('.')) {
    const menu = currentRoute.value.split('.')
    return (currentRoute.value = menu[menu.length - 2])
  }
  if (route !== currentRoute.value && currentRoute.value.includes(route)) {
    return (currentRoute.value = '')
  }
  if (route !== currentRoute.value) {
    return (currentRoute.value = route)
  }
  if (route === currentRoute.value) {
    return (currentRoute.value = '')
  }
  return (currentRoute.value = '')
}
toggle(route.name)
</script>
<style></style>
