import express from "express";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./db/connectMongoDB.js";





const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

console.log(process.env.MONGO_URI)
app.use("/api/auth", authRoutes);

app.listen(PORT, () =>{
    console.log(process.env.PORT)
    connectMongoDB();
});