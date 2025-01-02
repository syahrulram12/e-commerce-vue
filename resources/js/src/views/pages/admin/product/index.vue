<template>
  <b-card>
    <add-sidebar
      :is-add-sidebar-active.sync="isAddSidebarActive"
      @refetch-data="refetchData"
    />

    <b-row>
      <b-col cols="12" md="6">
        <b-form-group label="Select Category">
          <v-select
            v-model="categoryFilter"
            :options="categoryOptions"
            :clearable="true"
            :filterable="false"
            @search="onSearch"
            :reduce="(label) => label.id"
            label="name"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="my-2">
      <!-- Per Page -->
      <b-col
        cols="12"
        md="6"
        class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
      >
        <label class="my-auto mr-2">Show</label>
        <v-select
          v-model="perPage"
          :options="perPageOptions"
          label="label"
          :clearable="false"
          class="select-size-md mr-2"
        ></v-select>
        <label class="my-auto">entries</label>
      </b-col>

      <b-col cols="12" md="6">
        <div class="d-flex align-items-center justify-content-end">
          <b-form-input
            v-model="searchQuery"
            debounce="350"
            type="search"
            class="d-inline-block mr-1"
            placeholder="Search..."
          />
          <b-button variant="primary" @click="isAddSidebarActive = true">
            <span class="text-nowrap">Add Product</span>
          </b-button>
        </div>
      </b-col>
    </b-row>

    <b-table
      ref="refProductListTable"
      :sticky-header="true"
      striped
      fixed
      responsive
      :items="fetchProducts"
      :fields="tableColumns"
      primary-key="id"
      no-sort-reset
      :sort-by.sync="sortBy"
      show-empty
      empty-text="No matching records found"
      :sort-desc.sync="isSortDirDesc"
    >
      <template #table-colgroup="scope">
        <col
          v-for="field in scope.fields"
          :key="field.key"
          :style="{ width: rowWidth(field.key) }"
        />
      </template>

      <!-- Column: Image Icon -->
      <template #cell(image_link)="data">
        <img :src="data.item.image_link" height="40" />
      </template>

      <template #cell(status)="data">
        <b-badge
          pill
          :variant="`${StatusVariant(data.item.status)}`"
          class="text-capitalize p-1 rounded-sm"
        >
          {{ StatusName(data.item.status) }}
        </b-badge>
      </template>
      <!-- Column: Actions -->
      <template #cell(name)="data">
        <div class="font-weight-bold p-2" style="background-color: blanchedalmond">
          Category : {{ data.item.category_name }}
        </div>
        <span class="font-weight-normal p-2">{{ data.item.name }}</span>
        <br />
        <span class="font-weight-normal text-wrap text-muted p-2">
          slug: {{ data.item.slug }}
        </span>
      </template>
      <template #cell(actions)="data">
        <b-dropdown variant="link" no-caret>
          <template #button-content>
            <feather-icon
              icon="MoreVerticalIcon"
              size="16"
              class="align-middle text-body"
            />
          </template>
          <b-dropdown-item
            :to="{
              name: 'admin-product-detail',
              params: { id: data.item.id },
            }"
          >
            <feather-icon icon="FileTextIcon" />
            <span class="align-middle ml-50">Details</span>
          </b-dropdown-item>
          <b-dropdown-item variant="danger" @click="deleteCategory(data.item)">
            <feather-icon icon="Trash2Icon" />
            <span class="align-middle ml-50">Delete</span>
          </b-dropdown-item>
        </b-dropdown>
      </template>
    </b-table>
    <div class="mx-2 mb-2">
      <b-row>
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-start"
        >
          <span class="text-muted"
            >Showing {{ dataMeta.from }} to {{ dataMeta.to }} of
            {{ dataMeta.of }} entries</span
          >
        </b-col>
        <!-- Pagination -->
        <b-col
          cols="12"
          sm="6"
          class="d-flex align-items-center justify-content-center justify-content-sm-end"
        >
          <b-pagination
            v-model="currentPage"
            :total-rows="totalProducts"
            :per-page="perPage"
            first-number
            last-number
            class="mb-0 mt-1 mt-sm-0"
            prev-class="prev-item"
            next-class="next-item"
          >
            <template #prev-text>
              <feather-icon icon="ChevronLeftIcon" size="18" />
            </template>
            <template #next-text>
              <feather-icon icon="ChevronRightIcon" size="18" />
            </template>
          </b-pagination>
        </b-col>
      </b-row>
    </div>
  </b-card>
</template>

<script ript>
import { BBadge, BDropdown, BDropdownItem, BPagination, BTable } from "bootstrap-vue";
import { ref } from "vue";
import vSelect from "vue-select";
import useProductService from "./useProductService";
import AddSidebar from "./addSidebar.vue";
import { getCategorySearch } from "@/services/spa/category";

export default {
  components: {
    BTable,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,

    vSelect,
    AddSidebar,
  },
  data() {
    const categoryOptions = [];
    getCategorySearch({ q: "" })
      .then((res) => {
        this.categoryOptions = res.data;
      })
      .catch((error) => {
        this.$swal({
          toast: true,
          position: "top-center",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          icon: "error",
          title: `Error`,
          message: `Error fetching categories`,
        });
      });

    return {
      categoryOptions,
    };
  },
  setup() {
    const isAddSidebarActive = ref(false);
    const {
      categories,
      searchQuery,
      perPage,
      perPageOptions,
      tableColumns,
      refProductListTable,
      categoryFilter,
      sortBy,
      isSortDirDesc,
      currentPage,
      dataMeta,
      totalProducts,
      fetchProducts,
      refetchData,
      StatusName,
      StatusVariant,
    } = useProductService();

    return {
      categories,
      searchQuery,
      perPage,
      perPageOptions,
      currentPage,
      dataMeta,
      tableColumns,
      refProductListTable,
      sortBy,
      isSortDirDesc,
      totalProducts,
      categoryFilter,
      fetchProducts,
      refetchData,
      StatusVariant,
      StatusName,

      isAddSidebarActive,
    };
  },
  methods: {
    rowWidth(key) {
      if (key === "index") return "80px";
      if (key === "name") return "300px";
      return "150px";
    },
    onSearch(search, loading) {
      if (search.length) {
        loading(true);
        this.search(loading, search, this);
      }
    },
    search: _.debounce((loading, search, vm) => {
      getCategorySearch({ q: search })
        .then((res) => {
          vm.categoryOptions = res.data;
          loading(false);
        })
        .catch((error) => {
          vm.$bvToast.toast(`Error: ${error.response.data.message}`, {
            title: `Error`,
            variant: "danger",
            toaster: "b-toaster-top-center",
            solid: true,
          });
          loading(false);
        });
    }, 300),
  },
};
</script>
<style lang="scss">
// Toast Notification Component Styles
</style>
