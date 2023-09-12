<template>
    <el-button class="mb-3" color="#529b2e" icon="circlePlusFilled" @click="addForm">新增表單</el-button>
    <template v-if="FormList.length > 0">
        <ul>
            <li v-for="(i, idx) in FormList" :key="i" :class="`${currentPage === idx ? 'active' : ''}`"
                @click="currentPage = idx">
                <span> {{ i.id }}</span>
            </li>
        </ul>
        <div class="wrapper">
            <template v-for="idx in FormList.length" :key="idx">
                <keep-alive>
                    <form v-if="currentPage === (idx - 1)" class="flex flex-wrap px-[15px] py-[10px]">
                        <div class="col">
                            <label for="ID">設備ID</label>
                            <input id="ID" type="text" v-model="FormList[idx - 1]['id']" />
                        </div>
                        <div class="col">
                            <label for="user">巡檢人</label>
                            <input id="user" type="text" v-model="FormList[idx - 1]['user']" disabled
                                class="disabled:bg-gray-200" />
                        </div>
                        <div class="col">
                            <label for="city">設備縣市</label>
                            <input id="city" type="text" v-model="FormList[idx - 1]['city']" />
                        </div>
                        <div class="col">
                            <label for="address">設備地址</label>
                            <input id="address" type="text" v-model="FormList[idx - 1]['address']" />
                        </div>
                        <div class="col">
                            <label for="status">連線狀況</label>
                            <select class="select" id="status" v-model="FormList[idx - 1]['status']">
                                <option value="online">已連線</option>
                                <option value="disconnect">已斷線</option>
                                <option value="abnormal">連線異常</option>
                            </select>
                        </div>
                        <div class="col">
                            <label for="date">更新日期</label>
                            <el-date-picker id="inspect" type="datetime" value-format="YYYY-MM-DD"
                                v-model="FormList[idx - 1]['latestUpdate']" placeholder="選擇日期" />
                        </div>
                    </form>
                </keep-alive>
            </template>
        </div>
        <el-button icon="select" type="primary" @click="submit">
            <span class="font-bold">送出</span>
        </el-button>
        <el-button icon="close" type="danger" @click="removeForm">
            <span class="font-bold">全部清除</span>
        </el-button>
    </template>
</template>
<script setup lang="ts">
import { reactive, ref, getCurrentInstance, onMounted } from 'vue';
import { useCounter, useForm } from '../../store'
const app = getCurrentInstance()?.appContext.config.globalProperties
const currentPage = ref(0)
const store = useCounter()
const form = useForm()
let FormList = reactive<any[]>([])
onMounted(() => {
    for (const key in form.form) {
        FormList.push({
            id: form.form[key]['id'],
            city: form.form[key]['city'],
            address: form.form[key]['address'],
            user: store.userName,
            status: "online",
            latestUpdate: ""
        })
    }
})
const addForm = () => {
    const id = prompt("請輸入設備ID")
    if (id) {
        FormList.push({
            id,
            city: "",
            address: "",
            user: store.userName,
            status: "online",
            latestUpdate: ""
        })
    }
}
const removeForm = () => {
    FormList.length = 0
    form.$patch({
        form: []
    })
}
const submit = () => {
    app?.$axios('/modify', { method: "POST", data: FormList })
        .then((res: any) => {
            if (res.data === 'success') {
                FormList.length = 0
                form.$patch({
                    form: []
                })
            }
        })
        .catch((err: any) => console.log(err))
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
    width: 25%;
    display: flex;
    gap: 10px;
    align-items: center;
    padding: 5px;

    & label {
        white-space: nowrap;
        font-weight: bolder;
    }

    & input {
        min-width: 70%;
        border: 1px solid #d3d3d3;
        border-radius: .25rem;
        padding: 5px;

        &:focus {
            outline: none;
        }
    }
}
</style>