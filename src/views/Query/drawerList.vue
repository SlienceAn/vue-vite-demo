<template>
  <el-drawer
    :model-value="isOpen"
    size="30%"
    class="!shadow-none border-l-solid border-0.5 border-[var(--el-border-color)]"
    @close="close"
  >
    <template #header>
      <div class="font-bold text-xl text-center text-[var(--el-text-color-primary)]">
        新增測站設備(demo)
      </div>
    </template>
    <el-form
      ref="formRef"
      :model="form"
      :rules="rules"
    >
      <el-form-item
        label-position="top"
        label="新增者"
      >
        <el-input
          v-model="form.usersname"
          :value="data.usersname"
          disabled
        />
      </el-form-item>
      <el-form-item
        label-position="top"
        label="地址"
        prop="address"
      >
        <el-input
          v-model="form.address"
          placeholder="請輸入地址"
          clearable
          show-word-limit
          maxlength="30"
        />
      </el-form-item>
      <div class="flex gap-2">
        <el-form-item
          label-position="top"
          label="經度"
          prop="longitude"
        >
          <el-input-number
            v-model="form.longitude"
            :controls="false"
            class="!w-full"
          />
        </el-form-item>
        <el-form-item
          label-position="top"
          label="緯度"
          prop="latitude"
        >
          <el-input-number
            v-model="form.latitude"
            :controls="false"
            class="!w-full"
          />
        </el-form-item>
      </div>
      <el-form-item
        label-position="top"
        label="啟動日期"
        prop="startDate"
      >
        <el-date-picker
          v-model="form.startDate"
          class="!w-full"
        />
      </el-form-item>
      <el-form-item
        label-position="top"
        label="預設狀態"
        prop="status"
      >
        <el-select v-model="form.status">
          <template
            v-for="opt in statusList"
            :key="opt.label"
          >
            <el-option
              :label="opt.label"
              :value="opt.value"
            />
          </template>
        </el-select>
      </el-form-item>
      <el-form-item
        label-position="top"
        label="預設測項"
        prop="item"
      >
        <el-select
          v-model="form.item"
          multiple
        >
          <el-option value="TMP" />
          <el-option value="HUM" />
          <el-option value="WS" />
          <el-option value="Rain" />
          <el-option value="CO2" />
          <el-option value="CO" />
          <el-option value="O3" />
          <el-option value="PM10" />
          <el-option value="PM2.5" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button
        type="primary"
        class="border-solid"
        @click="resetForm"
      >
        重設
      </el-button>
      <el-button
        type="primary"
        class="border-solid"
        @click="submitForm"
      >
        送出
      </el-button>
    </template>
  </el-drawer>
</template>
<script lang="ts" setup>
import type { FormRules, FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
defineProps({
  isOpen: {
    type: Boolean
  }
})
const loginStore = useLoginStore()
const { data } = storeToRefs(loginStore)
const queryStore = useQueryStore()
const { form, statusList } = storeToRefs(queryStore)
const formRef = ref<FormInstance>()
const rules: FormRules = {
  address: [
    { required: true, message: '請輸入地址', trigger: 'blur' },
    { min: 3, message: '地址長度應大於3', trigger: 'blur' }
  ],
  longitude: [
    { required: true, message: '請輸入經度', trigger: 'blur' },
    { validator: validLongitude, trigger: 'blur' }
  ],
  latitude: [
    { required: true, message: '請輸入緯度', trigger: 'blur' },
    { validator: validlatitude, trigger: 'blur' }
  ],
  startDate: [
    { required: true, message: '日期不得為空', trigger: 'blur' }
  ],
  status: [
    { required: true, message: '狀態不得為空', trigger: 'blur' }
  ],
  item: [
    { required: true, message: '測項至少需一項', trigger: 'blur' }
  ]
}
function validLongitude(_, value, callback) {
  if (value >= 180 || value <= -180) {
    return callback(new Error('經度必須在180到-180'))
  }
  callback()
}
function validlatitude(_, value, callback) {
  if (value >= 90 || value <= -90) {
    return callback(new Error('緯度必須在90到-90'))
  }
  callback()
}
const emit = defineEmits(['update:close', 'list'])
const close = () => { emit('update:close', false) }
const submitForm = async () => {
  await formRef.value?.validate((valid) => {
    if (valid) {
      ElMessage({
        type:'success',
        message:`表單驗證測試 ${JSON.stringify(form.value)}`
      })
    }
  })
}
const resetForm = () => { formRef.value?.resetFields() }
</script>