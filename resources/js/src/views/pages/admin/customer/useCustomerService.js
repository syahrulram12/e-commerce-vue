import { ref, watch, computed } from "vue";
import { getList } from "@/services/spa/product";

export default function useProductService() {
    const refCategoryListTable = ref(null);
    // Table Handlers
    const tableColumns = [
        { key: "id" },
        { key: "name" },
        { key: "category_name" },
        { key: "status" },
        { key: "created_at" },
    ];
    const perPage = ref(10);
    const totalCategorys = ref(0);
    const currentPage = ref(1);
    const perPageOptions = [10, 25, 50, 100];
    const searchQuery = ref("");
    const sortBy = ref("id");
    const isSortDirDesc = ref(true);
    const statusFilter = ref(null);

    const dataMeta = computed(() => {
        const localItemsCount = refCategoryListTable.value
            ? refCategoryListTable.value.localItems.length
            : 0;
        return {
            from:
                perPage.value * (currentPage.value - 1) +
                (localItemsCount ? 1 : 0),
            to: perPage.value * (currentPage.value - 1) + localItemsCount,
            of: totalCategorys.value,
        };
    });

    const refetchData = () => {
        refCategoryListTable.value.refresh();
    };

    watch([currentPage, perPage, searchQuery, statusFilter], () => {
        refetchData();
    });

    const fetchCategorys = (ctx, callback) => {
        getList({
            params: {
                q: searchQuery.value,
                perPage: perPage.value,
                page: currentPage.value,
                sortBy: sortBy.value,
                sortDesc: isSortDirDesc.value,
                status: statusFilter.value,
            },
        })
            .then((response) => {
                const { data, total } = response.data;
                totalCategorys.value = total;
               
                callback(data);
            })
            .catch(() => {
                // this.$swal({
                //     toast: true,
                //     position: "top-end",
                //     showConfirmButton: false,
                //     timer: 3000,
                //     timerProgressBar: true,
                //     icon: "success",
                //     title: "Account created successfully",
                // });
            });
    };

    // *===============================================---*
    // *--------- UI ---------------------------------------*
    // *===============================================---*

    const StatusVariant = (status) => {
        if (status) return "primary";
        return "warning";
    };

    const StatusName = (status) => {
        if (status) return "Active";
        return "Inactive";
    };

    return {
        fetchCategorys,
        tableColumns,
        perPage,
        currentPage,
        totalCategorys,
        // dataMeta,
        perPageOptions,
        searchQuery,
        sortBy,
        isSortDirDesc,
        refCategoryListTable,

        StatusVariant,
        StatusName,
        refetchData,

        // Extra Filters
        statusFilter,
    };
}
