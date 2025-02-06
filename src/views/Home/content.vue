<template>
  <el-select class="mb-4 md:!hidden" />
  <el-row :gutter="10">
    <el-col
      :xs="12"
      :sm="8"
      :md="12"
      :lg="8"
    >
      <Card
        title="總機台數量"
        :message="22"
        color="blue"
      >
        <template #icon>
          <InfoFilled />
        </template>
      </Card>
    </el-col>
    <el-col
      :xs="12"
      :sm="8"
      :md="12"
      :lg="8"
    >
      <Card
        title="總斷線數量"
        :message="130"
        color="red"
      >
        <template #icon>
          <CircleCloseFilled />
        </template>
      </Card>
    </el-col>
    <el-col
      :xs="12"
      :sm="8"
      :md="12"
      :lg="8"
    >
      <Card
        title="連線異常數量"
        :message="390"
        color="green"
      >
        <template #icon>
          <WarningFilled />
        </template>
      </Card>
    </el-col>
  </el-row>
</template>
<script lang="tsx" setup>
import Card from '@/components/Card.vue'
</script>
<style>
.el-col {
  @apply mb-4;
}
</style>