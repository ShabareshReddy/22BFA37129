const express=require("express");
const app=express();
const userRouter = require("./routes/user");
const shortnerRouter=require("./routes/shortner")
require("dotenv").config();

app.use(express.json());


app.use("/user",userRouter);
app.use("/shortner",shortnerRouter);




app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on the port ${process.env.PORT || 3000}`)
})