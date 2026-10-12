import express from "express"
const authController = express()

import userModel from '../models/usersModel.js';
import bcrypt from "bcrypt"
import { createJWT, verifyToken } from "../middleWare/jwt.js";

authController.post("/signup", async (req, res) => {
  try {
    const username = req.body.username?.trim().toLowerCase();
    const password = req.body.password;

    if (!username || !password) {
      return res.status(400).json({
        field: !username ? "username" : "password",
        message: "Please fill in all required fields."
      });
    }
    if (username.length < 5) {
      return res.status(400).json({
        field: "username",
        message: "Username must contain at least 5 characters."
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        field: "password",
        message: "Password must contain at least 6 characters."
      });
    }
    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(409).json({
        field: "username",
        message: "Username already exists. Please sign in."
      });
    }
    const hasPassword = await bcrypt.hash(password, 10)
    await userModel.create({ username, password : hasPassword });
    return res.status(201).json({
      message: "Account created successfully."
    });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) {
      return res.status(409).json({
        field: "username",
        message: "Username already exists. Please sign in."
      });
    }
    return res.status(500).json({
      message: "Something went wrong. Please try again later."
    });
  }
});



authController.post("/signin", async (req, res) => {
  try {
    const username = req.body.username?.trim().toLowerCase();
    const password = req.body.password;

    if (!username || !password) {
      return res.status(400).json({
        field: !username ? "username" : "password",
        message: "Please enter your username and password."
      });
    }

    const user = await userModel.findOne({ username });
    if (!user) {
      return res.status(404).json({
        field: "username",
        message: "Account not found. Please create an account first."
      });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json({
        field: "password",
        message: "Incorrect password. Please try again."
      });
    }
    const token = createJWT(username);
    res.cookie("token", token, {
      httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 3 * 24 * 60 * 60 * 1000
    });
    return res.status(200).json({
      message: "Signed in successfully.",
      user: {
        _id: user._id,
        username: user.username
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Something went wrong. Please try again later."
    });
  }
});

authController.get('/me', verifyToken, async(req, res)=>{
    try{
        const userName = req.user.username
        const user = await userModel.findOne({username : userName}).select('-password')
        res.json({user})
    }catch(err){
        console.log(err)
        res.json({})
    }
})

authController.post("/logout", (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
    });

    return res.status(200).json({
      message: "Logged out successfully."
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong during logout."
    });
  }
});

export default authController;