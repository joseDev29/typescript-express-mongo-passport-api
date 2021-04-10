import express from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";
import { JWTStrategy } from "./middleware/passport";
import { config } from "./config/index.config";
import { authRouter } from "./routes/auth.routes";
import { specialRouter } from "./routes/special.routes";

//initialization
const app = express();

//settings
app.set("port", config.port);

//middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
passport.use(JWTStrategy);

//routes
app.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Hello user",
  });
});

app.use(authRouter);
app.use(specialRouter);

export { app };
