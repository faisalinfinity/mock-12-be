const express=require("express")
require("dotenv").config()
const app=express()
const cors=require("cors")
const { employeeRoute } = require("./routes/employeeRoute")
const { AuthorizationMiddleware } = require("./middlewares/AuthorizationMiddleware")
const { userRoute } = require("./routes/userRoute")
const { connection } = require("./connection/connection")

app.use(cors())
app.use(express.json())

app.use("/employees",AuthorizationMiddleware,employeeRoute)
app.use("/",userRoute)

app.listen(process.env.PORT,async()=>{
    try {
    await connection
    console.log(`Server running on port ${process.env.PORT}`)
        
    } catch (error) {
        
    }

})
