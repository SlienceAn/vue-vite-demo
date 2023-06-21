<template>
  <div class="card-group">
    <Card v-for="i in arr" :key="i" :title="i.title" :message="i.message" :color="i.color">
      <template v-slot:one>
        <component :is="i.icon" />
      </template>
      <template v-slot:two>
        <div>SSSS</div>
      </template>
    </Card>
  </div>
  <div class="panel-group">
    <Panel header="連線異常">
      <Table />
    </Panel>
    <Panel header="已斷線">
      <Table />
    </Panel>
  </div>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import Card from "@components/Card.vue";
import Panel from "@components/Panel.vue";
import Table from "@components/Table.vue";
const route = useRoute();
console.log("route name => ", route.name);
const arr = [
  {
    title: "總機台數量",
    message: "846",
    icon: "InfoFilled",
    color: "blue",
  },
  {
    title: "已連線",
    message: "233",
    icon: "SuccessFilled",
    color: "green",
  },
  {
    title: "連線異常",
    message: "90",
    icon: "WarningFilled",
    color: "orange",
  },
  {
    title: "已斷線",
    message: "409",
    icon: "CircleCloseFilled",
    color: "red",
  },
];
</script>
<style scoped lang="scss">
.card-group {
  @apply flex gap-4 mb-4 flex-col md: flex-row;
}

.panel-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>