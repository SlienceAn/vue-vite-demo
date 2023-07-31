<template>
    <el-button class="mb-3" color="#529b2e" icon="circlePlusFilled" @click="addForm">新增表單</el-button>
    <template v-if="FormList.length > 0">
        <ul>
            <li v-for="(i, idx) in FormList" :key="i.id" :class="`${currentPage === idx ? 'active' : ''}`"
                @click="currentPage = idx">
                <span> {{ i.id }}</span>
                <el-icon size="20" @click="removeForm">
                    <Close />
                </el-icon>
            </li>
        </ul>
        <div class="wrapper">
            <Form />
        </div>
        <el-button icon="select" type="primary"><span class="font-bold">送出</span></el-button>
        <el-button icon="CircleCloseFilled" type="danger"><span class="font-bold">清空</span></el-button>
    </template>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue';
import Form from '../Form.vue';

const FormList = reactive<any[]>([
    { id: "AA-01", name: "", date: "" },
    { id: "AA-02", name: "", date: "" },
    { id: "AA-03", name: "", date: "" }
])
const addForm = () => FormList.push({ id: "AA-01", name: "", date: "" })
const removeForm = () => FormList.splice(0, 1)
const currentPage = ref(0)
</script>
<style scoped lang="scss">
$border-color: #a7a5a5;

ul {
    display: flex;
    flex: 1;
    border-bottom: 1px solid $border-color;
    gap: .25rem;

    li {
        display: flex;
        align-items: center;
        gap: .5rem;
        border: 1px solid $border-color;
        padding: 5px 15px;
        background: #d4d4d4;
        border-top-left-radius: .5rem;
        border-top-right-radius: .5rem;
        margin: 0 0 -1px 0;
        white-space: nowrap;

        &:hover {
            cursor: pointer;
        }
    }
}

.active {
    border-bottom: 0;
    background: #fff;
}

.wrapper {
    background: #fff;
    border: 1px solid $border-color;
    border-top: 0;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    margin-bottom: .5rem;
}
</style>