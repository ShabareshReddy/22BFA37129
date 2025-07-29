const express=require("express");
const app=express();
const userRouter=express.Router();
const axios=require("axios");



app.userRouter("/register",async(req,res)=>{
    try{
    const { email,name, mobileNo, githubUserName, rollNo, accessCode }=req.body;
        const register=await axios.post("http://20.244.56.144/evaluation-service/register",{
            email,name,mobileNo,githubUserName,rollNo, accessCode
        });
        return res.send({
            msg:"Your are signedIn succesfully"
        });
    }catch(error){
        res.json({
           msg: `${error.message}`
        })
    }
})

module.exports=userRouter