import express from 'express'
import ViteExpress from 'vite-express'
import dayjs from 'dayjs';
import { faker } from "@faker-js/faker/locale/zh_TW"
const { location, date, internet, vehicle } = faker
import { MongoClient } from 'mongodb'
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
//登入
app.post("/login", (req, res) => {
    console.log("body ->", req.body)
    const { account: acc, password: psw } = req.body
    //PM...只能讀取
    if (acc === 'pm' && psw === '123') {
        res.status(200).json({
            success: true,
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
        })
        //RD...可以修改資料
    } else if (acc === 'rd' && psw === '123') {
        res.status(200).json({
            success: true,
            message: "RD Login Success !",
            data: [{
                path: "/Main/Information",
                name: "設備資訊"
            },
            {
                path: "/Main/Query",
                name: "設備查詢"
            },
            ]
        })
    }
})
//設備資訊
app.get("/device", (req, res) => {
    const data = []
    for (let i = 0; i < 87; i++) {
        data.push({
            id: internet.ipv4(),
            type: vehicle.fuel(),
            address: location.city() + location.streetAddress(),
            dateTime: dayjs(date.past()).format("MM-DD-YYYY"),
        })
    }
    res.status(200).json({
        success: true,
        message: "Get online Success",
        data
    })
})
//異常設備資訊
app.get("/device/:status", (req, res) => {
    const { status } = req.params
    if (status === 'disconnect') {
        const data = []
        for (let i = 0; i < 52; i++) {
            data.push({
                id: internet.ipv4(),
                type: vehicle.fuel(),
                address: location.city() + location.streetAddress(),
                dateTime: dayjs(date.past()).format("YYYY-MM-DD HH:mm"),
            })
        }
        res.status(200).json({
            success: true,
            message: `Get ${status} data Success`,
            data
        })
    } else if (status === 'abnormal') {
        const data = []
        for (let i = 0; i < 36; i++) {
            data.push({
                id: internet.ipv4(),
                type: vehicle.fuel(),
                address: location.city() + location.streetAddress(),
                dateTime: dayjs(date.past()).format("YYYY-MM-DD HH:mm"),
            })
        }
        res.status(200).json({
            success: true,
            message: `Get ${status} data Success`,
            data
        })
    } else {
        res.status(400).json({
            success: false,
            message: 'failed !'
        })
    }
})
//設備近三十日
app.get("/query", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Get online Success",
        data: []
    })
})
//Connect to MongoDB....Test
const url = `mongodb+srv://beast964089:neverland37@cluster0.mb1fb2n.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url)
const dbName = "business_arch"
const collection = "content"
app.get("/connect/test", async (req, res) => {
    await client.connect()
    await client.db(dbName).collection(collection).find({}).toArray()
        .then(data => {
            res.status.json({
                success: true,
                message: "success !!!!",
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
        base: "/api"
    }
})
ViteExpress.listen(app, 3000, () => console.log("Server is listening on 3000 port"))