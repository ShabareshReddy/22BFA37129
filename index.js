const express=require("express");
const app=express();
const { userRouter }=require("./routes/user");
require("dotenv").config();

app.use(express.json());


app.use("/user",userRouter);






app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on the port ${process.env.PORT || 3000}`)
})