import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        trim : true,
    },
    jsonDataDetails : 
        {
            type : [{
                name : {
                    type : String,
                    required : true
                },
                dataId : {
                    type : mongoose.Schema.Types.ObjectId,
                    ref : "jsonData",
                    required : true
                },
                jsonExpiryDate: {
                    type: Date,
                    required: true
                },
                endpoint : {
                    type : String,
                    required : true
                }
            }],
            default : []
        }
})

const userModel = mongoose.model("users", UserSchema)

export default userModel;