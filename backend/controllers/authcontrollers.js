import User from "../models/usermodel.js";
import { generateTokenAndSetCookie } from "../lib/utils/generateToken.js";
import bcrypt from "bcryptjs"

export const signup = async(req,res) =>{
    try {
       const {fullName, username,password,email} = req.body;
       
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       if(!emailRegex.test(email)) return res.status(400).json({error: "Invalid email format"});
       
       const existingUser = await User.findOne({username: username});
       
       if (existingUser) return res.status(400).json({error: "Username is already taken"});
       
       const existingEmail = await User.findOne({email});
       if (existingEmail) return res.status(400).json({error: "Email is already taken"})

       const salt = await bcrypt.genSalt(10);
       const hashedPass = await bcrypt.hash(password, salt);
       
       
       const newUser = new User({
        fullName:fullName,
        username:username,
        email:email,
        password:hashedPass,
       })

       if (newUser){
        generateTokenAndSetCookie(newUser._id,res)
        await newUser.save();
        res.status(201).json({
            _id:newUser.fullName,
            username:newUser.username,
            email:newUser.email,
            followers:newUser.followers,
            following:newUser.following,
            profileIMG:newUser.profileIMG,
            coverIMG:newUser.coverIMG


        })
       }else{
        res.status(400).json({error:"Invalid user data"});
       }

    } catch (error) {
        console.log("Error in signup controller",error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}
export const login = async (req,res) =>{
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "")
        if (!user || ! isPasswordCorrect) return res.status(400).json({error: "invalid username or password"})
        generateTokenAndSetCookie(user._id, res)    
        res.status(200).json({
            _id:user.fullName,
            username:user.username,
            email:user.email,
            followers:user.followers,
            following:user.following,
            profileIMG:user.profileIMG,
            coverIMG:user.coverIMG
        })
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}
export const logout = async(req,res) =>{
   try {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"Logged out successfully"})
   } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({error: "Internal Sever Error"})
   }
}

export const getMe = async(req, res) =>{
    try {
        const user = await User.findById(req.user._id).select("-password");
        res.status(200).json(user);
    } catch (error) {
        console.log("Error in getMe controller", error.message);
        res.status(500).json({error:"Internal Server Error"})
    }
}