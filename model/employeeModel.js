const mongoose=require("mongoose")

const employeeSchema=mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    department:String,
    salary:Number,
    userId:String,
    date:String
})

const employeeModel=mongoose.model("employee",employeeSchema)

module.exports={
    employeeModel
}