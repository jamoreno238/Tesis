import express from "express";
import morgan from "morgan";
import path from 'path';


const cors = require('cors');

//routes
import obrasRelevancia from "./routes/obrasRelevancia.routes";

const app = express();

//Settings
app.set("port", 4000);

//Middlewares
app.use(cors());
  
app.use(morgan("dev"));
app.use(express.json());

//Routes
//app.use('/imagenes', express.static(path.join(__dirname, 'public')));
app.use("/api/",obrasRelevancia );







export default app;
