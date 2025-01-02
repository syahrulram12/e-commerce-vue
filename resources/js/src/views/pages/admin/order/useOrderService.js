import { ref, watch, computed } from "vue";
import { getList } from "@/services/spa/order";

export default function useOrderService() {
    const refOrderListTable = ref(null);
    // Table Handlers
    const tableColumns = [
        {
            key: "order_number",
            sortable: true,
            stickyColumn: true,
            isRowHeader: true,
            variant: "light",
        },
        { key: "sub_total", sortable: false, label: "Sub Total" },
        { key: "total_tax", sortable: true },
        { key: "total_price", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "created_at", sortable: true },
    ];
    const perPage = ref(10);
    const totalOrders = ref(0);
    const currentPage = ref(1);
    const perPageOptions = [10, 25, 50, 100];
    const searchQuery = ref("");
    const sortBy = ref("status");
    const isSortDirDesc = ref(true);
    const categoryFilter = ref(null);

    const dataMeta = computed(() => {
        const localItemsCount = refOrderListTable.value
            ? refOrderListTable.value.localItems.length
            : 0;
        return {
            from:
                perPage.value * (currentPage.value - 1) +
                (localItemsCount ? 1 : 0),
            to: perPage.value * (currentPage.value - 1) + localItemsCount,
            of: totalOrders.value,
        };
    });

    const refetchData = () => {
        refOrderListTable.value.refresh();
    };

    watch([currentPage, perPage, searchQuery, categoryFilter], () => {
        refetchData();
    });

    const fetchOrders = (ctx, callback) => {
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
                totalOrders.value = total;
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

    const StatusVariant = (status) => {
        if (status === "SUCCESS") return "success";
        if (status === "PENDING") return "warning";
        return "danger";
    };

    return {
        fetchOrders,
        tableColumns,
        perPage,
        currentPage,
        totalOrders,
        dataMeta,
        perPageOptions,
        searchQuery,
        sortBy,
        isSortDirDesc,
        refOrderListTable,

        StatusVariant,
        refetchData,

        // Extra Filters
        categoryFilter,
    };
}
