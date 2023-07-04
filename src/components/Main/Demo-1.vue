<template>
  <div class="card-group">
    <Card v-for="i in arr" :key="i" :title="i.title" :message="i.message" :color="i.color">
      <template v-slot:icon>
        <component :is="i.icon" />
      </template>
      <template v-slot:map>
        <div class="w-full h-[900px] md:h-[400px] lg:h-[700px]">
          <LMap ref="map" :zoom="15" :center="[22.63151, 120.30132]">
            <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap" />
            <LMarker :lat-lng="[22.63151, 120.30132]"></LMarker>
            <LMarker :lat-lng="[22.63151, 120.32344]"></LMarker>
            <LMarker :lat-lng="[22.63151, 120.30788]"></LMarker>
          </LMap>
        </div>
      </template>
    </Card>
  </div>
  <div class="panel-group">
    <Panel header="連線異常">
      <Table :head="tableHead" :data="abnormalData" />
    </Panel>
    <Panel header="已斷線">
      <Table :head="tableHead" :data="disconnectData" />
    </Panel>
  </div>
</template>
<script setup lang="ts">
import Card from "@components/Card.vue";
import Panel from "@components/Panel.vue";
import Table from "@components/Table.vue";
import { faker } from "@faker-js/faker/locale/zh_TW";
import { reactive } from "vue";

const tableHead = reactive<string[]>(['Project ID', 'Project Area', 'Address', 'Date', 'Time'])
const abnormalData = reactive<any>([])//連線異常
const disconnectData = reactive<any>([])//斷線資訊
for (let i = 0; i < 43; i++) {
  abnormalData.push({
    fullName: faker.person.fullName(),
    fish: faker.animal.fish(),
    cat: faker.animal.cat(),
    dog: faker.animal.dog(),
    bird: faker.animal.bird()
  })
}
for (let i = 0; i < 26; i++) {
  disconnectData.push({
    fullName: faker.person.fullName(),
    fish: faker.animal.fish(),
    cat: faker.animal.cat(),
    dog: faker.date.birthdate(),
    bird: faker.animal.bird()
  })
}
const arr = [
  {
    title: "總機台數量",
    message: "123",
    icon: "InfoFilled",
    color: "blue",
  },
  {
    title: "已連線",
    message: "92",
    icon: "SuccessFilled",
    color: "green",
  },
  {
    title: "連線異常",
    message: "20",
    icon: "WarningFilled",
    color: "orange",
  },
  {
    title: "已斷線",
    message: "11",
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