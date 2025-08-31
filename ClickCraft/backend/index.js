import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import aiRouter from "./routes/air.routes.js";
import Openai from "openai";
const openai = new Openai({ apiKey: process.env.OPENAI_API_KEY })




const port = process.env.PORT 
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {console.log(`🚀 Server is running on port ${port}`)});

app.use('/air', aiRouter);

export {openai};
