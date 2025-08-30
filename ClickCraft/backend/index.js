import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import aiRouter from "./routes/air.routes.js";

dotenv.config();
const port = process.env.PORT 
const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, () => {console.log(`🚀 Server is running on port ${port}`)});

app.use('/air', aiRouter);
