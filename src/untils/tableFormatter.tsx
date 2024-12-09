import { dayjs } from 'element-plus'
import { Delete, Edit } from '@element-plus/icons-vue'
export default () => {
  const statusIcon = (type: 'online' | 'abnormal' | 'disconnect') => {
    switch (type) {
    case 'online':
      return (
        <el-tooltip content="正常">
          <el-icon size={22}>
            <i-material-symbols-check-circle class="text-green-600" />
          </el-icon>
        </el-tooltip>
      )
    case 'abnormal':
      return (
        <el-tooltip content="連線異常">
          <el-icon size={22}>
            <i-material-symbols-warning class="text-yellow-500" />
          </el-icon>
        </el-tooltip>
      )
    case 'disconnect':
      return (
        <el-tooltip content="斷線">
          <el-icon size={22}>
            <i-material-symbols-cancel class="text-red-500" />
          </el-icon>
        </el-tooltip>
      )
    }
  }
  const accumulation = (row) => {
    const now = dayjs().format('YYYY-MM-DD HH:mm')
    return dayjs(now).diff(row.latestUpdate, 'day')
  }
  const menu = (row) => {
    const list = ['主控台', '設備查詢', '巡檢表單', '帳戶管理']
    return (
      <div class="flex gap-1 flex-wrap">
        {
          row.menu.map(el => {
            return (
              <el-tag type="info">
                {list[el - 1]}
              </el-tag>
            )
          })}
      </div>
    )
  }
  const dateFormat = (row) => dayjs(row.created_at).format('YYYY-MM-DD  HH:mm:ss')

  const settingTool = (row) => {
    const userStore = useUserForm()
    return (
      <div>
        <el-tooltip content="編輯">
          <el-button
            icon={Edit}
            onClick={() => userStore.$patch({
              form: {
                id: row.id,
                account: row.account,
                password: userStore.form.password,
                username: row.username,
                menu: row.menu
              },
              isDialog: true,
              dialogFunc: 2
            })}
          />
        </el-tooltip>
        <el-tooltip content="刪除">
          <el-button
            icon={Delete}
            onClick={() => userStore.deleteUser(row.id)}
          />
        </el-tooltip>
      </div>
    )
  }
  const addUnit = (row, col) => {
    const { value, unit } = row.measurements[col.property]
    return (
      <div className="flex px-2">
        <span>{value}</span>
        <span className="text-[10px] font-bold ml-auto">{unit}</span>
      </div>
    )
  }
  return {
    statusIcon,
    accumulation,
    menu,
    dateFormat,
    settingTool,
    addUnit
  }
}