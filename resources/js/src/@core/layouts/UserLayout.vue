<template>
  <div class="h-full">
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="mr-auto pr-5">
          <b-nav-item :to="{ name: 'home' }">Home</b-nav-item>
          <b-nav-item-dropdown class="category-dropdown">
            <template #button-content>
              <span>Product</span>
            </template>
            <b-dropdown-item
              v-for="category in categories"
              :key="category.id"
              @click="
                $router.replace({
                  name: 'product',
                  query: { category: category.slug },
                  replace: true,
                })
              "
            >
              {{ category.name }}
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item :to="{ name: 'about-us' }">About Us</b-nav-item>
          <b-nav-item :to="{ name: 'contact' }">Contact</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <b-link :to="{ name: 'cart' }">
              <feather-icon
                icon="ShoppingCartIcon"
                size="16"
                class="align-middle text-body"
              />
            </b-link>
          </b-nav-item>

          <b-nav-item-dropdown v-if="user" right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <span>{{ user.customer_name }}</span>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
          <template v-else>
            <b-nav-item>
              <b-link :to="{ name: 'login' }" class="text-dark"> Sign in </b-link>
            </b-nav-item>
            <b-nav-item>
              <b-link>
                <b-link :to="{ name: 'register' }" class="text-dark"> Register </b-link>
              </b-link>
            </b-nav-item>
          </template>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <main class="h-full">
      <transition name="fade" mode="out-in">
        <slot></slot>
      </transition>
      <footer>
        <slot name="footer">
          <div class="footer-content border-top">
            <b-row>
              <b-col class="text-justify">
                <h5 class="font-weight-bold">Address</h5>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
                  aspernatur illo possimus, cum, itaque ratione eveniet mollitia laborum
                  ducimus iure provident iusto dolores, neque quod ex deleniti debitis
                  similique! Obcaecati.
                </p>
              </b-col>
              <b-col class="text-left">
                <h5 class="font-weight-bold">Company</h5>
                <b-link class="text-dark" :to="{ name: 'about-us' }">About Us</b-link
                ><br />
                <b-link class="text-dark" :to="{ name: 'contact' }">Contact</b-link>
              </b-col>
              <b-col class="text-left">
                <h5 class="font-weight-bold">Our Help</h5>
                <b-link class="text-dark" :to="{ name: 'faq' }">FAQ</b-link><br />
              </b-col>
            </b-row>
            <b-row class="d-flex">
              <b-col class="text-left">
                Our Social Media <br />
                <b-link href="https://facebook.com" target="_blank">
                  <feather-icon icon="FacebookIcon" size="16" class="mx-2 text-body" />
                </b-link>
                <b-link href="https://twitter.com" target="_blank">
                  <feather-icon icon="TwitterIcon" size="16" class="mx-2 text-body" />
                </b-link>
                <b-link href="https://instagram.com" target="_blank">
                  <feather-icon icon="InstagramIcon" size="16" class="mx-2 text-body" />
                </b-link>
                <b-link href="https://linkedin.com" target="_blank">
                  <feather-icon icon="LinkedinIcon" size="16" class="mx-2 text-body" />
                </b-link>
              </b-col>
            </b-row>
          </div>
        </slot>
      </footer>
    </main>
  </div>
</template>

<script>
import { getAuthUser } from "@/auth/utils";
import httpService from "@/services/network-service";
import { getList } from "@/services/api/category";
import {
  BNavbarBrand,
  BNavbar,
  BNavbarToggle,
  BCollapse,
  BNavbarNav,
  BNavItem,
  BNavItemDropdown,
  BNavForm,
  BFormInput,
  BButton,
  BDropdownItem,
} from "bootstrap-vue";

export default {
  components: {
    BNavbar,
    BNavbarBrand,
    BNavItemDropdown,
    BDropdownItem,
    BNavbarToggle,
    BCollapse,
    BNavbarNav,
    BNavItem,
    BNavForm,
    BFormInput,
    BButton,
  },
  created() {
    this.getCategories();
  },
  methods: {
    async getCategories(slug = "", perPage = 10, page = 1) {
      try {
        const response = await getList();
        this.categories = response.data;
        console.log(this.categories);
      } catch (error) {
        console.log(error);
      }
    },
    logout() {
      httpService
        .logout()
        .then((response) => {
          localStorage.removeItem("authUser");
          this.$router.replace({ name: "login" });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  setup() {
    const user = getAuthUser();
    return {
      user,
    };
  },
  data() {
    const categories = [];
    return {
      authUser: null,
      categories,
    };
  },
};
</script>

<style scoped>
main {
  flex: 1;
  min-height: 100%;
}

header {
  background-color: #f8f9fa;
  padding: 1rem;
}

footer {
  padding: 0 !important;
  width: 100%;
  bottom: 0;
}

.footer-content {
  padding: 2rem;
  width: 100%;
  background-color: rgb(252, 243, 233);
}

footer {
  background-color: #f8f9fa;
  padding: 1rem;
  text-align: center;
}
</style>
