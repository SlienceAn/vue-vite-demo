import express from 'express'
import ViteExpress from 'vite-express'
import dayjs from 'dayjs';
import { faker } from '@faker-js/faker/locale/zh_TW'
import { MongoClient } from 'mongodb'

const { location, date, vehicle } = faker
const app = express()

//config
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//生成ID
const generateID = () => {
    const id = Math.random().toString().substring(2, 6)
    const upperChars = []
    for (let i = 65; i < 91; i++) {
        upperChars.push(String.fromCharCode(i))
    }
    let randomChar = upperChars[Math.floor(Math.random() * 26)]
    return randomChar + id
}
const statusRandom = () => {
    const code = Math.floor(Math.random() * (3 - 0))
    switch (code) {
        case 0:
            return 'online'
        case 1:
            return 'disconnect'
        case 2:
            return 'abnormal'
    }
}
//All Fake Data
let data = []
for (let i = 0; i < 150; i++) {
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
        latestUpdate: dayjs(date.past()).format('YYYY-MM-DD HH:mm'),
        status: statusRandom()
    })
}
//API------------------------------------------
//登入
app.post('/login', (req, res) => {
    console.log('body ->', req.body)
    const { account: acc, password: psw } = req.body
    //PM...只能讀取
    if (acc === 'pm' && psw === '123') {
        res.status(200).json({
            success: true,
            userName: 'pm',
            message: 'PM Login Success !',
            data: [{
                path: '/Main/Information',
                name: '設備資訊'
            },
            {
                path: '/Main/Query',
                name: '設備查詢'
            }]
        })
        //RD...可以修改資料
    } else if (acc === 'rd' && psw === '123') {
        res.status(200).json({
            success: true,
            userName: 'rd',
            message: 'RD Login Success !',
            data: [{
                path: '/Main/Information',
                name: '設備資訊'
            },
            {
                path: '/Main/Query',
                name: '設備查詢'
            },
            {
                path: '/Main/InspectionForm',
                name: '巡檢表單'
            }]
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Login failed !!'
        })
    }
})
//設備資訊
app.get('/device', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Get online Success',
        data
    })
})
//異常設備資訊
app.get('/device/:status', (req, res) => {
    const { status } = req.params
    if (status) {
        let response;
        response = data.filter(el => el['status'] === status)
            .map(el => {
                return {
                    id: el['id'],
                    city: el['city'],
                    address: el['address'],
                    latestUpdate: el['latestUpdate']
                }
            })
        console.log(response)
        res.status(200).json({
            success: true,
            message: `Get ${status} data Success`,
            data: response
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'Query device failed'
        })
    }
})
//設備查詢
app.get('/query/:type', (req, res) => {
    const { type } = req.params
    const { area, id } = req.query
    const data = []
    if (type === 'equipment') {
        for (let i = 0; i < 30; i++) {
            data.push({
                date: dayjs(date.recent()).format('YYYY-MM-DD HH:mm'),
                status: 'ok',
                value: {
                    TMP: 23,
                    HUM: 23,
                    PM25: Math.floor(Math.random() * 100)
                }
            })
        }
        res.status(200).json({
            success: true,
            message: 'Get online Success',
            data
        })
    }
    if (type === 'event') {
        for (let i = 0; i < 23; i++) {
            data.push({
                id: generateID(),
                type: vehicle.fuel(),
                address: location.city() + location.streetAddress(),
                dateTime: dayjs(date.past()).format('MM-DD-YYYY'),
            })
        }
        res.status(200).json({
            success: true,
            message: 'Get online Success',
            data
        })
    }
})
//表單巡檢
app.post('/modify', (req, res) => {
    console.log(req.body)
    res.status(200).json({
        success: true,
        message: 'Modify Success !',
    })
})

//Connect to MongoDB....Test Failed
const url = 'mongodb+srv://beast964089:neverland37@cluster0.mb1fb2n.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(url)
const dbName = 'business_arch'
const collection = 'content'

app.get('/connect/test', async (req, res) => {
    await client.connect()
    await client.db(dbName).collection(collection).find({}).toArray()
        .then(data => {
            res.status.json({
                success: true,
                message: 'success !!!!',
                data
            })
        }).catch(err => {
            res.status(400).json({
                success: false,
                message: err
            })
        }).finally(() => client.close())
})

ViteExpress.config({
    inlineViteConfig: {
        base: '/api'
    }
})
ViteExpress.listen(app, 4200, () => console.log('Server is listening on 4200 port'))