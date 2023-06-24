import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from 'morgan';
import connectdb from "./config/db.js";
import authroute from "./routes/authroute.js";
import cors from 'cors';
import categoryroutes from './routes/categoryroutes.js'
import productroutes from './routes/productroutes.js'
import path from 'path';
import { fileURLToPath } from "url";

// configure env
dotenv.config()

// database config
connectdb()

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

// rest object
const app = express()

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname,'./ecommerce/build')))

// routes
app.use("/api/v1/auth", authroute);
app.use("/api/v1/category",categoryroutes);
app.use("/api/v1/product",productroutes);


// rest api
app.use("*",function(req,res){
    res.sendFile(path.join(__dirname,"./ecommerce/build/index.html"))
})
// port
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
    console.log(`server running on ${process.env.DEV_MODE} or ${PORT}`.bgCyan.white);
})