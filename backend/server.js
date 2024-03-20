const express=require("express");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./config/db");
connectDB();
const cors=require("cors");
const user=require("./routes/userRoute")
const record=require("./routes/recordRoute")

const app=express();
app.use(cors());
app.use(express.json());



app.use("/api/v1/user", user);
app.use("/api/v1/record", record);

app.listen(process.env.PORT || 4001,(err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);
    }
    console.log(`server is running on port: ${process.env.PORT}`);
})