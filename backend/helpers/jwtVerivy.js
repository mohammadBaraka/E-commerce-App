import jwt from "jsonwebtoken";
import { jwtSecret } from "../helpers/constant.js";

export const jwtVerify = (req, res, next) => {
  try {
    const token = req.cookies?.access_token;
    if (!token) return res.status(403).json("Unauthorized");
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) return res.status(400).json("Access denied");
      req.userId = decoded._id;
      req.isAdmin = decoded.isAdmin;
      next();
    });
  } catch (error) {
    return res.status(401).send({ message: "Invalid token!" });
  }
};
