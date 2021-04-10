import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 6000,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  sessionTime: Number(process.env.SESSION_TIME_IN_SECONDS) || 1800,
};

export { config };
