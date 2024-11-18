const modules = import.meta.glob('/mock/modules/*.ts')
let mockApi: any = []
const loadAllModules = async () => {
  const modulePromises = Object.entries(modules).map(async (module) => {
    try {
      const mod: any = await module[1]()
      return mod.default
    } catch (error) {
      console.error('導入mock api 錯誤 => ', error)
      return null
    }
  })
  const results = await Promise.all(modulePromises)
  mockApi = results.filter(Boolean)
}

loadAllModules()

export default mockApi
