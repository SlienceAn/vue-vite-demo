import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import deviceMock from './modules/device'
import infoMock from './modules/info'
import loginMock from './modules/login'
import searchMock from './modules/search'
import cityMock from './modules/city'

export function setupProdMockServer() {
  createProdMockServer([
    infoMock,
    deviceMock,
    loginMock,
    searchMock,
    cityMock
  ])
}