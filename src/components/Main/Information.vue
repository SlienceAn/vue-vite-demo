<template>
  <el-container class="h-full bg-[#fff]">
    <el-header class="border border-b border-b-dark">
      <div>header</div>
    </el-header>
    <el-main>
      <el-scrollbar>
        <div class="container">
          <div class="chart">
            <Chart />
          </div>
          <div class="chart">
            <Chart />
          </div>
          <div class="chart">
            <Chart />
          </div>
          <div class="chart">
            <Chart />
          </div>
        </div>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>
<script setup lang="tsx">
import Chart from '@/components/common/Echart.vue'

</script>
<style scoped lang="scss">
:deep(.el-header, .el-main) {
  @apply px-4;
}

.container {
  @apply mx-auto flex flex-wrap gap-4 p-4;
  .chart {
    @apply h-200px w-full md:w-[calc(50%-0.5rem)] p-5 bg-gray-2 rounded;
  }
}
</style>