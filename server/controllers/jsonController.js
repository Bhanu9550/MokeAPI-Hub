import express from "express"
const jsonController = express()

import { verifyToken } from "../middleWare/jwt.js"
import jsonModel from '../models/jsonModel.js';
import userModel from "../models/usersModel.js";

jsonController.post('/sendjson', verifyToken, async(req, res)=>{
    try{
        const username = req.user.username
        const jsonName = req.body.jsonName
        const data = {data : req.body.data}
        const response = await jsonModel.create(data)
        const jsonExpiryDate = response.expiresAt
        const endpoint = `${process.env.BACKEND_DOMAIN}/api/${username}/${jsonName}`
        const user = await userModel.findOneAndUpdate({username},
            {$push : {
                jsonDataDetails :{
                    name : jsonName,
                    dataId : response._id,
                    jsonExpiryDate : jsonExpiryDate,
                    endpoint : endpoint
                }
            }},{ new: true }).select("-password")

        res.json({user, endpoint})
    }catch(err){
        console.log(err)
        res.json({err})
    }
})

jsonController.get('/:userName/:jsonName', async(req, res)=>{
    try{
        const username = req.params.userName.toLowerCase()
        const jsonName = req.params.jsonName
        const user = await userModel.findOne({username})
        if(!user){
            return res.json({err : "endPoint maybe wrong"})
        }

        const UserJsonData = user.jsonDataDetails.find(item => item.name == jsonName)
        if(!UserJsonData){
            return res.json({err : "endPoint maybe wrong"})
        }

        const jsonId = UserJsonData.dataId
        const jsonData = await jsonModel.findOne({_id : jsonId})
        if(!jsonData){
            return res.json({msg : "jsonData expired"})
        }

        res.json(jsonData.data)
    }catch(err){
        return res.json({err : err.message})
    }
})

export default jsonController;