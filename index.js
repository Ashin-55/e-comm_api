const express = require("express")
const app = express()

const indexRouter=require("./routes")
const connetDB = require("./config/database")
const port = process.env.port||8000

connetDB()
app.use(express.json())

app.get("/",(req,res,next)=>{
    res.json({message:"Ok"})
})

app.use("/api",indexRouter)

app.listen(port,()=>{
console.log(`server is running in port ${port}`)
})