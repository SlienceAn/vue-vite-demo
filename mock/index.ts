import { MockMethod } from 'vite-plugin-mock'
import { faker } from "@faker-js/faker/locale/zh_TW"
import dayjs from 'dayjs';

const { location, date, vehicle } = faker
type Data = {
    id: string
    city: string,
    address: string
    latitude: number
    longitude: number
    value: any
    latestUpdate: string
    status: string
}

//生成ID
const generateID = () => {
    const id = Math.random().toString().substring(2, 6)
    const upperChars = []
    for (let i = 65; i < 91; i++) {
        upperChars.push(String.fromCharCode(i))
    }
    const randomChar = upperChars[Math.floor(Math.random() * 26)]
    return randomChar + id
}
const statusRandom = (): string => {
    const code = Math.floor(Math.random() * (3 - 0))
    let status;
    switch (code) {
        case 0:
            status = "online"
            break;
        case 1:
            status = "disconnect"
            break;
        case 2:
            status = "abnormal"
            break;
    }
    return status
}
//字串轉物件
const toObject = (body: string): any => {
    const obj = {}
    body.split("&")
        .map(el => el.split("="))
        .map(el => {
            obj[el[0]] = el[1]
        })

    return obj
}
//All Fake Data
const data: Data[] = []
for (let i = 0; i < 300; i++) {
    data.push({
        id: generateID(),
        city: location.city(),
        address: location.streetAddress(),
        latitude: 22.11,
        longitude: 120.22,
        value: {
            TMP: Math.floor(Math.random() * 100),
            HUM: Math.floor(Math.random() * 100),
            PM25: Math.floor(Math.random() * 100)
        },
        latestUpdate: dayjs(date.past()).format("YYYY-MM-DD HH:mm"),
        status: statusRandom()
    })
}
export default [
    {
        //登入
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
            //PM...只能讀取
            if (acc === 'pm' && psw === '123') {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                data = {
                    success: true,
                    userName: "PM",
                    message: "PM Login Success !",
                    data: [{
                        path: "/Main/Information",
                        name: "設備資訊"
                    },
                    {
                        path: "/Main/Query",
                        name: "設備查詢"
                    }]
                }
                res.end(`${JSON.stringify(data)}`, "utf-8")
                //RD...可以修改資料
            } else if (acc === 'rd' && psw === '123') {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                data = {
                    success: true,
                    userName: "RD",
                    message: "PM Login Success !",
                    data: [{
                        path: "/Main/Information",
                        name: "設備資訊"
                    },
                    {
                        path: "/Main/Query",
                        name: "設備查詢"
                    },
                    {
                        path: "/Main/InspectionForm",
                        name: "巡檢表單"
                    }]
                }
                res.end(`${JSON.stringify(data)}`, "utf-8")
            } else {
                res.statusCode = 404
                res.setHeader('Content-Type', 'application/json')
                data = {
                    success: false,
                    message: "Login failed !!"
                }
                res.end(`${JSON.stringify(data)}`, "utf-8")
            }
        }
    },
    {
        //設備資訊
        url: '/device/:status',
        method: "get",
        response: ({ query }) => {
            if (Object.keys(query).length !== 0) {
                const { status } = query
                let response: any[] = [];
                response = data.filter(el => el['status'] === status)
                    .map(el => {
                        return {
                            id: el['id'],
                            city: el['city'],
                            address: el['address'],
                            latestUpdate: el['latestUpdate'],
                        }
                    })
                return {
                    success: true,
                    message: "Get online Success",
                    data: response
                }
            } else {
                return {
                    success: true,
                    message: "Get online Success",
                    data
                }
            }
        }
    },
    {
        //查詢分類
        url: '/query',
        method: "get",
        response: ({ query }) => {
            const { type } = query
            if (type === 'equipment') {
                let { city } = query
                city = city.replace('台', '臺')
                console.log(data)
                return {
                    success: true,
                    message: "Get success!",
                    data: data.filter(el => el.city.includes(city))
                }
            } else if (type === 'event') {
                const { startTime, endTime, status } = query
                const result: any[] = []
                for (const key of data) {
                    if (new Date(key.latestUpdate) <= new Date(endTime) &&
                        new Date(key.latestUpdate) >= new Date(startTime) &&
                        key.status === status
                    ) {
                        result.push({
                            id: key.id,
                            city: key.city,
                            address: key.address,
                            latestUpdate: key.latestUpdate
                        })
                    }
                }
                result.sort((start, end) => {
                    return new Date(start.latestUpdate) - new Date(end.latestUpdate) //??
                })
                return {
                    success: true,
                    message: "Get success!",
                    data: result
                }
            } else {
                return {
                      success:false,
                      message:"Get failed..."
                }
            }
        }
    },
    {
        //巡檢表單
        url: '/modify',
        method: 'post',
        rawResponse: async (req, res) => {
            let reqbody: any = ''
            let postData: any[] = [];
            await new Promise((resolve) => {
                req.on('data', (chunk) => {
                    reqbody += chunk
                })
                req.on('end', () => resolve(undefined))
            })
            postData = JSON.parse(reqbody)
            console.log(postData)
            //表單資料
            postData.forEach(el => {
                data.forEach(list => {
                    if (list.id === el.id) {
                        list.city = el.city
                        list.address = el.address
                        list.latestUpdate = el.latestUpdate
                        list.status = el.status
                    }
                })
            })
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.end(`success`, "utf-8")
        }
    },
] as MockMethod[]