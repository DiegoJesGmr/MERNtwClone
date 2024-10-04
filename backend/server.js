import express from "express";
import authRoutes from "./routes/auth.routes.js"
import connectMongoDB from "./db/connectMongoDB.js";
import 'dotenv/config'
const app = express();


console.log(process.env.MONGO_URI)
app.use("/api/auth", authRoutes);

app.listen(8000, () =>{
    console.log(process.env.PORT)
    console.log("Server is runnning on port 8000");
    connectMongoDB();
});