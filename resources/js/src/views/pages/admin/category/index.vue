<template>
  <b-card>
    <add-sidebar
      :is-add-sidebar-active.sync="isAddSidebarActive"
      @refetch-data="refetchData"
    />

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
            <span class="text-nowrap">Add Category</span>
          </b-button>
        </div>
      </b-col>
    </b-row>

    <b-table
      ref="refCategoryListTable"
      :items="fetchCategories"
      :fields="tableColumns"
      primary-key="id"
      :sort-by.sync="sortBy"
      show-empty
      empty-text="No matching records found"
      :sort-desc.sync="isSortDirDesc"
    >
      <template #cell(status)="data">
        <b-badge
          pill
          :variant="`${StatusVariant(data.item.status)}`"
          class="text-capitalize p-1 rounded-sm"
        >
          {{ StatusName(data.item.status) }}
        </b-badge>
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
            :total-rows="totalCategories"
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
import useCategoriesService from "./useCategoriesService";
import AddSidebar from "./addSidebar.vue";
export default {
  components: {
    BTable,
    BBadge,
    BPagination,
    BDropdown,
    BDropdownItem,

    vSelect,
    AddSidebar,
  },
  data() {
    return {
      categories: [],
    };
  },
  watch: {
    categories: {
      handler(newCategories) {
      
      },
      deep: true,
    },
  },
  mounted() {
   
  },
  setup() {
    const isAddSidebarActive = ref(false);
    const {
      categories,
      searchQuery,
      perPage,
      perPageOptions,
      tableColumns,
      refCategoryListTable,
      statusFilter,
      sortBy,
      isSortDirDesc,
      currentPage,
      dataMeta,
      totalCategories,
      fetchCategories,
      refetchData,
      StatusName,
      StatusVariant,
    } = useCategoriesService();

    return {
      categories,
      searchQuery,
      perPage,
      perPageOptions,
      currentPage,
      dataMeta,
      tableColumns,
      refCategoryListTable,
      sortBy,
      isSortDirDesc,
      totalCategories,
      statusFilter,
      fetchCategories,
      refetchData,
      StatusVariant,
      StatusName,

      isAddSidebarActive,
    };
  },
  methods: {},
};
</script>
<style lang="scss">
// Toast Notification Component Styles
</style>
