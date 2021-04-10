import { Router } from "express";
import passport from "passport";

const specialRouter = Router();

specialRouter.get(
  "/special",

  passport.authenticate("jwt", { session: false }),

  (req, res, next) => {
    res.status(200).json({
      message: "welcome to special routes",
    });
  }
);

export { specialRouter };
