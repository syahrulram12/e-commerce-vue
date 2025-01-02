<template>
  <b-card>
    <b-table
      :items="fetchCategorys"
      :fields="fields"
      hover
      responsive
      show-empty
      empty-text="No Matching Records found"
    >
    </b-table>
  </b-card>
</template>

<script ript>
import { BTable } from "bootstrap-vue";
import useCustomerService from "./useCustomerService";
export default {
  components: {
    BTable,
  },
  data() {
    return {
      categories: [],
      fields: [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "description", label: "Description" },
      ],
    };
  },
  watch: {
    categories: {
      handler(newCategories) {
        
      },
      deep: true,
    },
  },
  setup() {
    const {
      categories,
      currentPage,
      fetchCategories,
      refCategoryListTable,
      statusFilter,
      fetchCategorys,
      refetchData,
    } = useCustomerService();

    return {
      categories,
      currentPage,
      refCategoryListTable,
      statusFilter,
      fetchCategorys,
      refetchData,
    };
  },
  methods: {},
};
</script>
<style lang="scss">
// Toast Notification Component Styles
</style>
