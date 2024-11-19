import type { MockMethod } from 'vite-plugin-mock'
import mockData from '@mock/data'
const { userList, routerList } = mockData

export default {
  url: '/login',
  method: 'post',
  rawResponse: async (req, res) => {
    let reqbody: any = ''
    let data
    await new Promise((resolve) => {
      req.on('data', (chunk) => {
        reqbody += chunk
      })
      req.on('end', () => resolve(undefined))
    })
    const { account: acc, password: psw } = JSON.parse(reqbody)
    //選單列表
    const menu: any = []
    //是否有匹配帳號密碼
    const userCheck = userList.find(el => el.acc === acc && el.psw === psw)
    if (!userCheck) {
      res.statusCode = 401
      res.setHeader('Content-Type', 'application/json')
      data = {
        success: false,
        message: '登入失敗!'
      }
      res.end(`${JSON.stringify(data)}`, 'utf-8')
    } else {
      userCheck.menu.forEach(el => menu.push(routerList[el - 1]))
      res.statusCode = 200
      res.setHeader('Content-Type', 'application/json')
      data = {
        success: true,
        userName: userCheck.userName,
        isPremission: true,
        message: 'Login Success !',
        data: menu
      }
      res.end(`${JSON.stringify(data)}`, 'utf-8')
    }
  }
} as MockMethod
