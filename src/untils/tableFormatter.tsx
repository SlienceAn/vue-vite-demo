export default () => {
  const statusIcon = (type) => {
    switch(type.status) {
    case 'online':
      return (
        <el-tooltip content="正常">
          <el-icon size={22}>
            <i-material-symbols-check-circle class="text-green-600"/>
          </el-icon>
        </el-tooltip>
      )
    case 'abnormal':
      return (
        <el-tooltip content="連線異常">
          <el-icon size={22}>
            <i-material-symbols-warning class="text-yellow-500"/>
          </el-icon>
        </el-tooltip>
      )
    case 'disconnect':
      return (
        <el-tooltip content="斷線">
          <el-icon size={22}>
            <i-material-symbols-cancel class="text-red-500"/>
          </el-icon>
        </el-tooltip>
      )
    }
  }
  return {
    statusIcon
  }
}