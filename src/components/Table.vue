<template>
    <div class="flex items-center justify-end gap-2 px-2 py-1">
        <span>每頁顯示</span>
        <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
        </select>
        <span>筆</span>
    </div>
    <table>
        <thead>
            <tr>
                <th scope="col">
                    Project ID
                </th>
                <th scope="col">
                    Project Area
                </th>
                <th scope="col">
                    Address
                </th>
                <th scope="col">
                    Date
                </th>
                <th scope="col">
                    Time
                </th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">
                    Apple MacBook Pro 17"
                </th>
                <td>
                    Silver
                </td>
                <td>
                    Laptop
                </td>
                <td>
                    $2999
                </td>
                <td>
                    <a href="#" class="font-medium text-blue-600 hover:underline">Edit</a>
                </td>
            </tr>
            <tr>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td class="px-6 py-4">
                    White
                </td>
                <td class="px-6 py-4">
                    Laptop PC
                </td>
                <td class="px-6 py-4">
                    $1999
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td class="px-6 py-4">
                    Black
                </td>
                <td class="px-6 py-4">
                    Accessories
                </td>
                <td class="px-6 py-4">
                    $99
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                </td>
            </tr>
            <tr>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Google Pixel Phone
                </th>
                <td class="px-6 py-4">
                    Gray
                </td>
                <td class="px-6 py-4">
                    Phone
                </td>
                <td class="px-6 py-4">
                    $799
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 hover:underline">Edit</a>
                </td>
            </tr>
            <tr>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    Apple Watch 5
                </th>
                <td class="px-6 py-4">
                    Red
                </td>
                <td class="px-6 py-4">
                    Wearables
                </td>
                <td class="px-6 py-4">
                    $999
                </td>
                <td class="px-6 py-4">
                    <a href="#" class="font-medium text-blue-600 hover:underline">Edit</a>
                </td>
            </tr>
        </tbody>
        <div class="page-group flex gap-1 px-5 py-2 hover:cursor-pointer">
            <span class="flex items-center">
                <el-icon :size="20">
                    <CaretLeft />
                </el-icon>
            </span>
            <span class="page" v-for="i in 5" :key="i">{{ i }}</span>
            <span class="flex items-center">
                <el-icon :size="20">
                    <CaretRight />
                </el-icon>
            </span>
        </div>
    </table>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
table {
    @apply w-full text-sm text-left text-gray-500;

    thead {
        @apply text-xs text-gray-700 bg-gray-50;

        tr th {
            @apply px-6 py-3 text-lg;
        }
    }

    tbody {
        tr {
            @apply border-b bg-gray-50;

            th {
                @apply px-6 py-4 font-medium text-gray-900 whitespace-nowrap;
            }

            td {
                @apply px-6 py-4;
            }
        }
    }
}
.page {
  @apply border border-gray-400 rounded-md px-3 py-1;
}
</style>