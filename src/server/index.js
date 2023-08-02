import express from 'express'
import ViteExpress from 'vite-express'
import { faker } from "@faker-js/faker/locale/zh_TW";
const { location, date, internet, vehicle } = faker
// import { MongoClient } from 'mongodb'
const app = express()
//登入
app.post("/login", (req, res) => {
    console.log("body", req.body)
    res.status(200).json({
        success: true,
        message: "Login Success !",
        data: []
    })
})
//設備資訊
app.get("/device", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Get Success",
        data: []
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
                data: date.past(),
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
                data: new Date(date.past()),
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

// const url = `mongodb+srv://beast964089:neverland37@cluster0.mb1fb2n.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(url)
// const dbName = "business_arch"
// const collection = "content"
// app.get("/connect", async (req, res) => {
//     await client.connect()
//     await client.db(dbName).collection(collection).find({}).toArray()
//         .then(data => {
//             res.status.json({
//                 success: true,
//                 message: "success !!!!",
//                 data
//             })
//         }).catch(err => {
//             res.status(400).json({
//                 success: false,
//                 message: err
//             })
//         }).finally(() => client.close())
// })

ViteExpress.config({
    inlineViteConfig: {
        base: "/api"
    }
})
ViteExpress.listen(app, 3000, () => console.log("Server is listening on 3000 port"))