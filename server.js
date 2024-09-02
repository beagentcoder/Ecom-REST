import express from "express";
import  swagger from 'swagger-ui-express'
import bodyParser from "body-parser";
import cors from 'cors'

import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";
import cartRouter from "./src/features/cart/cart.routes.js";
// import apiDocs from './swagger3.0.json' assert {type:'json'}
import loggerMiddleware, { logger } from "./src/middlewares/logger.middleware.js";
import ApplicationError from "./src/error-handler/appError.js";


const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(loggerMiddleware)
// app.use((req,res,next)=>{
//   res.header('Access-Control-Allow-Origin','http://localhost:5500')
//   res.header('Access-Control-Allow-Headers','*')
//   res.header('Access-Control-Allow-Methods','*')
//   if(req.method=="OPTIONS"){
//     res.sendStatus(200)
//   }
//   next()
// })


// API routes
// app.use('/api-docs',swagger.serve,swagger.setup(apiDocs))
app.use("/api/products",jwtAuth, productRouter);

app.use("/api/users",userRouter)
app.use("/api/cart",jwtAuth,cartRouter)

app.get("/", (req, res) => {
  res.send("RESTful APIs");
});
app.use((err,req,res,next)=>{
  console.log(err)
  if(err instanceof ApplicationError){
    res.status(err.status).send(err.message)
  }else{
  logger.info(err.message)
  res.status(500).send("Something Broke ....Try again later")
  }
})
app.use((req,res)=>{
  res.status(404).json({message: "API not found"})
})

app.listen(3200, () => {
  console.log("Server is running on port 3200");
});
