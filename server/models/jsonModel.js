import mongoose from "mongoose"

const jsonSchema = new mongoose.Schema({
    data : {
        type : mongoose.Schema.Types.Mixed,
        required : true
    },
    expiresAt : {
        type : Date,
        default : ()=> new Date(Date.now() + 5*24*60*60*1000)
    }
}, {timestamps : true})

jsonSchema.index({expiresAt : 1}, {expireAfterSeconds : 0})

const jsonModel = mongoose.model("jsonData", jsonSchema)

export default jsonModel;