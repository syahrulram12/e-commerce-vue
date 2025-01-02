<template>
  <div>
    <header>
      <nav
        class="navbar navbar-brand-lg navbar-dark bg-dark shadow-sm z-3"
        toggleable="lg"
        type="dark"
        variant="info"
      >
        <b-navbar-brand href="#">NavBar</b-navbar-brand>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="flex pr-3">
          <div>
            <b-dropdown
              size="sm"
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
              right
            >
              <template #button-content>
                <div
                  class="profile border border-secondary rounded-circle d-flex justify-content-center align-items-center"
                >
                  <img
                    src="http://127.0.0.1:8000/storage/default.png"
                    alt=""
                    width="100%"
                  />
                </div>
              </template>
              <b-dropdown-item href="#">Action</b-dropdown-item>
              <b-dropdown-item href="#">Another action</b-dropdown-item>
              <b-dropdown-item @click="logout">Logout</b-dropdown-item>
            </b-dropdown>
          </div>
        </b-navbar-nav>
      </nav>
    </header>
    <div class="d-flex h-full">
      <nav
        id="sidebarMenu"
        class="col-md-3 col-lg-2 d-md-block bg-light navbar-light sidebar collapse shadow-sm z-2"
      >
        <div class="sidebar-sticky pt-3">
          <ul class="nav flex-column">
            <li class="nav-item">
              <b-link
                :to="{ name: 'admin-dashboard' }"
                class="nav-link"
                :active="isActive('admin-dashboard')"
                href="#"
              >
                <span data-feather="home"></span>
                Dashboard
              </b-link>
            </li>
            <li class="nav-item">
              <b-link
                :to="{ name: 'admin-category' }"
                :active="isActive('admin-category')"
                class="nav-link"
                href="#"
              >
                <span data-feather="file"></span>
                Categories
              </b-link>
            </li>
            <li class="nav-item">
              <b-link
                :to="{ name: 'admin-product' }"
                :active="isActive('admin-product')"
                class="nav-link"
                href="#"
              >
                <span data-feather="shopping-cart"></span>
                Products
              </b-link>
            </li>
            <li class="nav-item">
              <b-link
                :to="{ name: 'admin-order' }"
                class="nav-link"
                :active="isActive('admin-order')"
                href="#"
              >
                <span data-feather="users"></span>
                Orders
              </b-link>
            </li>
            <li class="nav-item">
              <b-link
                :to="{ name: 'admin-user' }"
                class="nav-link"
                :active="isActive('admin-user')"
                href="#"
              >
                <span data-feather="bar-chart-2"></span>
                Users
              </b-link>
            </li>
            <li class="nav-item">
              <b-link
                :to="{ name: 'admin-customer' }"
                class="nav-link"
                :active="isActive('admin-customer')"
                href="#"
              >
                <span data-feather="layers"></span>
                Customers
              </b-link>
            </li>
          </ul>
        </div>
      </nav>
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4 z-1 py-4">
        <transition name="fade" mode="out-in">
          <slot>
            <div class="mx-auto">
              
            </div>
          </slot>
        </transition>
      </main>
    </div>
  </div>
</template>
<script>
import httpService from "@core/libs/network-service";
import {
  BButton,
  BCollapse,
  BDropdownItem,
  BForm,
  BFormInput,
  BNavbar,
  BNavbarBrand,
  BNavbarNav,
  BNavbarToggle,
  BNavForm,
  BNavItem,
  BLink,
  BDropdown,
} from "bootstrap-vue";

export default {
  components: {
    BNavbar,
    BNavbarBrand,
    BCollapse,
    BNavbarToggle,
    BNavbarNav,
    BNavItem,
    BDropdownItem,
    BNavForm,
    BFormInput,
    BDropdown,
    BForm,
    BButton,
    BLink,
  },
  methods: {
    isActive(routeName) {
      return this.$route.name === routeName;
    },
    logout() {
      httpService
        .logout()
        .then((response) => {
          this.$router.push({ name: "login" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
