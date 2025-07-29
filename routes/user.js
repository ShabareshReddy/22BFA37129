const express=require("express");
const app=express();
const userRouter=express.Router();
const axios=require("axios");
const jwt=require("jsonwebtoken");
require("dotenv").config();


app.use(express.json());

userRouter.post("/register",async(req,res)=>{
    try{
    const { email,name, mobileNo, githubUserName, rollNo, accessCode }=req.body;
        const register=await axios.post("http://20.244.56.144/evaluation-service/register",{
            email,name,mobileNo,githubUserName,rollNo, accessCode
        });
       return res.send({
    msg: "You can register only once. Do not forget to save Your clientID and clientSecret; you cannot retrieve them again",
    data: { email, name, mobileNo, githubUserName, rollNo, accessCode,clientID,clientSecret }
    });
    }catch(error){
    res.status(error.response?.status || 500).json({
        msg: error.message,
        data: error.response?.data || null
    });
}
});

userRouter.post("/login",async(req,res)=>{
    try{
        const{email, name,rollNo,accessCode,clientID,clientSecret }=req.body;
        const login=await axios.post("http://20.244.56.144/evaluation-service/auth",{
            email, name,rollNo,accessCode,clientID,clientSecret
        });
        if (login.data && login.data.success) {
            const token = jwt.sign({ email }, process.env.JWT_SECRET);
            return res.json({
                msg: 'Login successful',
                token
            });
        } else {
            return res.status(401).json({ msg: 'Login failed'});
        }
    } catch (error) {
        res.status(error.response?.status || 500).json({
            msg: error.message,
            data: error.response?.data || null
        });
    }
});







module.exports=userRouter