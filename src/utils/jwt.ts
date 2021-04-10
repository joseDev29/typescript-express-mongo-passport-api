import jwt from "jsonwebtoken";
import { config } from "../config/index.config";

const createToken = (payload: object) => {
  //Se parsea la jwtSecret a string
  // y sessionTime a number

  const token = jwt.sign(payload, <string>config.jwtSecret, {
    expiresIn: config.sessionTime,
  });

  return token;
};

export { createToken };
