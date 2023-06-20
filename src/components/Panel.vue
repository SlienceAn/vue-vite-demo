<template>
  <div class="panel">
    <div class="panel-header p-4 text-center">
      <span class="font-bold text-2xl">{{ header }}</span>
    </div>
    <div class="panel-body">
      <table>
        <thead>
          <tr>
            <th scope="col">
              Product name
            </th>
            <th scope="col">
              Color
            </th>
            <th scope="col">
              Category
            </th>
            <th scope="col">
              Price
            </th>
            <th scope="col">
              Action
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
      </table>
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
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ header: string }>()
</script>
<style scoped lang="scss">
.panel {
  background: #fff;
  @apply w-full border border-gray-400;
}

table {
  @apply w-full text-sm text-left text-gray-500;

  thead {
    @apply text-xs text-gray-700 uppercase bg-gray-50;

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