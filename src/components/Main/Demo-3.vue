<template>
    <el-date-picker v-model="start_date" type="year" value-format="" placeholder="請選擇日期" />
    <div>{{ start_date }}</div>
    <el-date-picker v-model="end_date" value-format="YYYYMMDD" placeholder="選擇XXXXX"></el-date-picker>
    <div>{{ end_date }}</div>
    <el-button icon="edit" color="green">
        search
    </el-button>
</template>

<script setup lang="ts">
import { ref } from "vue";

const start_date = ref("")
const end_date = ref("")
</script>

<style scoped lang="scss"></style>