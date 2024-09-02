import UserModel from "./user.model.js";
import jwt from "jsonwebtoken";
export default class UserController {
  login(req, res) {
    const { email, password } = req.body;
    const result = UserModel.signIn(email, password);
    
    if (!result) {
      return res.status(401).json({ message: "Invalid credentials" });
    } else {
      // create token
      const token = jwt.sign(
        { userId: result.id, email: result.email },
        "36SLwigPI1yo9aOGV2wOgBKIi3zb63yi",
        {
          expiresIn: "1h", // expires in 1 hour
        }
      );
      
      res.status(200).send(token);
    }
  }
  register(req, res) {
    const result = UserModel.signUp(req.body);
    if (!result) {
      return res.status(400).json({ message: "Failed to register" });
    } else {
      res.status(201).json({ message: "User registered successfully" });
    }
  }
}
