import jwt from "jsonwebtoken";
import { logger } from "./logger.middleware.js";

const jwtAuth = (req, res, next) => {
  //read the token
  const token = req.headers["authorization"];

  //if no token return the error

  if (!token) {
    return res.status(401).send({ auth: false, message: "No token provided." });
  }

  //check if token is valid
  try{
   const payload= jwt.verify(token, "36SLwigPI1yo9aOGV2wOgBKIi3zb63yi");
    req.userId = payload.userId
  }
  catch(err) {
    const  message= {
      auth: false,
      message: `${new Date().toString()}---Unauthorized `

    }
    logger.info(message)
    return res.status(401).send('Unauthorized');
  }
  
  //call next middleware
  next()

};

export default jwtAuth;