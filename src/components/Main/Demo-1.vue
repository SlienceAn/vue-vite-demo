<template>
  <div class="card-group">
    <Card v-for="i in arr" :key="i" :title="i.title" :message="i.message" :color="i.color">
      <template v-slot:one>
        <component :is="i.icon" />
      </template>
      <template v-slot:two>
        <div>Fate</div>
        <div>Css</div>
        <div>HTML</div>
      </template>
    </Card>
  </div>
  <div class="panel-group">
    <Panel header="連線異常">
      <Table :head="['Project ID', 'Project Area', 'Address', 'Date', 'Time']" :data="tableData" />
    </Panel>
    <!-- <Panel header="已斷線">
      <Table :data="tableData"/>
    </Panel> -->
  </div>
</template>
<script setup lang="ts">
import Card from "@components/Card.vue";
import Panel from "@components/Panel.vue";
import Table from "@components/Table.vue";
import { faker } from "@faker-js/faker/locale/zh_TW";
import { reactive } from "vue";

const tableData = reactive<any>([])
for (let i = 0; i < 50; i++) {
  tableData.push({
    fullName: faker.person.fullName(),
    fish: faker.animal.fish(),
    cat: faker.animal.cat(),
    dog: faker.animal.dog(),
    bird: faker.animal.bird()
  })
}
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