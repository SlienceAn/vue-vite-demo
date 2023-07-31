import express from 'express'
import ViteExpress from 'vite-express'
import { faker } from "@faker-js/faker/locale/zh_TW";
// import { MongoClient } from 'mongodb'
const app = express()
//登入
app.post("/login", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Login Success !"
    })
})
app.get("/demo", (req, res) => {
    const data = []
    for (let i = 0; i < 43; i++) {
        data.push({
            fullName: faker.person.fullName(),
            fish: faker.animal.fish(),
            cat: faker.animal.cat(),
            dog: faker.animal.dog(),
            bird: faker.animal.bird()
        })
    }
    res.status(200).json({
        success: false,
        message: "Get success",
        data
    })
})
app.post("/demo", (req, res) => res.send("post success!"))

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