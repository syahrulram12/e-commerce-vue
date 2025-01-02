import { ref, watch, computed } from "vue";
import { getList } from "@/services/spa/product";

export default function useProductService() {
    const refProductListTable = ref(null);
    // Table Handlers
    const tableColumns = [
        {
            key: "name",
            sortable: true,
            stickyColumn: true,
            isRowHeader: true,
            variant: "light",
        },
        { key: "image_link", sortable: false, label: "Image" },
        { key: "about_product", sortable: true },
        { key: "description", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "created_at", sortable: true },
        { key: "actions", sortable: false },
    ];
    const perPage = ref(10);
    const totalProducts = ref(0);
    const currentPage = ref(1);
    const perPageOptions = [10, 25, 50, 100];
    const searchQuery = ref("");
    const sortBy = ref("status");
    const isSortDirDesc = ref(true);
    const categoryFilter = ref(null);

    const dataMeta = computed(() => {
        const localItemsCount = refProductListTable.value
            ? refProductListTable.value.localItems.length
            : 0;
        return {
            from:
                perPage.value * (currentPage.value - 1) +
                (localItemsCount ? 1 : 0),
            to: perPage.value * (currentPage.value - 1) + localItemsCount,
            of: totalProducts.value,
        };
    });

    const refetchData = () => {
        refProductListTable.value.refresh();
    };

    watch([currentPage, perPage, searchQuery, categoryFilter], () => {
        refetchData();
    });

    const fetchProducts = (ctx, callback) => {
        getList({
            params: {
                q: searchQuery.value,
                perPage: perPage.value,
                page: currentPage.value,
                sortBy: sortBy.value,
                sortDesc: isSortDirDesc.value,
                category: categoryFilter.value,
            },
        })
            .then((response) => {
                const { data, total } = response.data;
                totalProducts.value = total;
                callback(data);
            })
            .catch(() => {
                this.$toast("I'm a toast!");

                // Or with options
                this.$toast("My toast content", {
                    timeout: 2000,
                });
            });
    };

    // *===============================================---*
    // *--------- UI ---------------------------------------*
    // *===============================================---*

    const StatusVariant = (is_active) => {
        if (is_active) return "success";
        return "danger";
    };

    const StatusName = (is_active) => {
        if (is_active) return "Active";
        return "Inactive";
    };

    return {
        fetchProducts,
        tableColumns,
        perPage,
        currentPage,
        totalProducts,
        dataMeta,
        perPageOptions,
        searchQuery,
        sortBy,
        isSortDirDesc,
        refProductListTable,

        StatusVariant,
        StatusName,
        refetchData,

        // Extra Filters
        categoryFilter,
    };
}
