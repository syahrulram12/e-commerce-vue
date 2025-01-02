import { ref, watch, computed } from "vue";
import { getList } from "@/services/spa/category";

export default function useCategorieservice() {
    const refCategoryListTable = ref(null);
    // Table Handlers
    const tableColumns = [
        { key: "name", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "created_at", sortable: true },
        { key: "actions", sortable: false },
    ];
    const perPage = ref(10);
    const totalCategor = ref(0);
    const currentPage = ref(1);
    const perPageOptions = [10, 25, 50, 100];
    const searchQuery = ref("");
    const sortBy = ref("status");
    const isSortDirDesc = ref(true);
    const statusFilter = ref(null);

    const dataMeta = computed(() => {
        const localItemsCount =
            refCategoryListTable.value 
                ? refCategoryListTable.value.localItems.length
                : 0;
        return {
            from:
                perPage.value * (currentPage.value - 1) +
                (localItemsCount ? 1 : 0),
            to: perPage.value * (currentPage.value - 1) + localItemsCount,
            of: totalCategor.value,
        };
    });

    const refetchData = () => {
        refCategoryListTable.value.refresh();
    };

    watch([currentPage, perPage, searchQuery, statusFilter], () => {
        refetchData();
    });

    const fetchCategories = (ctx, callback) => {
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
                totalCategor.value = total;
                
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

    const StatusVariant = (is_active) => {
        if (is_active) return "success";
        return "danger";
    };

    const StatusName = (is_active) => {
        if (is_active) return "Active";
        return "Inactive";
    };

    return {
        fetchCategories,
        tableColumns,
        perPage,
        currentPage,
        totalCategor,
        dataMeta,
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
