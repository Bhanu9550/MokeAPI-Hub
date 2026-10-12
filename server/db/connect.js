import mongoose from "mongoose";

const connectDB = ()=>{
    try{
        mongoose.connect(process.env.DBSTRING)
        console.log('DataBase is connected')
    }catch(err){
        console.log(err.message)
    }
}

export default connectDB;