<template>
    <el-button class="mb-3" color="#529b2e" icon="circlePlusFilled" @click="addForm">新增表單</el-button>
    <template v-if="FormList.length > 0">
        <ul>
            <li v-for="(i, idx) in FormList" :key="i" :class="`${currentPage === idx ? 'active' : ''}`"
                @click="currentPage = idx">
                <span> {{ i.id }}</span>
                <el-icon size="20" @click="removeForm" class="hover:bg-red-500">
                    <Close class="hover:text-white" />
                </el-icon>
            </li>
        </ul>
        <div class="wrapper">
            <template v-for="(i, idx) in FormList" :key="i.id">
                <keep-alive>
                    <form v-if="currentPage === idx" class="flex px-[15px] py-[10px]">
                        <div class="col">
                            <label for="ID">設備ID</label>
                            <input id="ID" type="text" v-model="FormList[idx]['id']" />
                        </div>
                        <div class="col">
                            <label for="postition">設備位置</label>
                            <input id="position" type="text" v-model="FormList[idx]['location']" />
                        </div>
                        <div class="col">
                            <label for="user">巡檢人</label>
                            <input id="user" type="text" v-model="FormList[idx]['user']" />
                        </div>
                        <div class="col">
                            <label for="user">巡檢日期</label>
                            <input id="user" type="text" v-model="FormList[idx]['date']" />
                        </div>
                    </form>
                </keep-alive>
            </template>
        </div>
        <el-button icon="select" type="primary" @click="submit"><span class="font-bold">送出</span></el-button>
        <el-button icon="CircleCloseFilled" type="danger"><span class="font-bold">清空</span></el-button>
    </template>
</template>
<script setup lang="ts">
import { reactive, ref, getCurrentInstance } from 'vue';
import { useCounter } from '../../store'

const app = getCurrentInstance()?.appContext.config.globalProperties
const currentPage = ref(0)
const store = useCounter()
//表單列表資料
const FormList = reactive<any[]>([])

const addForm = () => {
    const id = prompt("請輸入設備ID")
    if (id) {
        FormList.push({
            id,
            location: "",
            user: store.userName,
            date: ""
        })
    }
}
const removeForm = () => FormList.splice(0, 1)
const submit = () => {
    console.log(FormList)
    app?.$axios('/modify', { method: "POST", data: FormList })
        .then(res => console.log(res))
        .catch(err => console.log(err))

}
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

.col {
    min-width: 25%;
    display: flex;
    align-items: center;
    padding-right: 10px;

    & label {
        width: 30%;
        white-space: nowrap;
        font-weight: bolder;
    }

    & input {
        width: 70%;
        border: 1px solid #d3d3d3;
        border-radius: .25rem;
        padding: 5px;

        &:focus {
            outline: none;
        }
    }
}
</style>