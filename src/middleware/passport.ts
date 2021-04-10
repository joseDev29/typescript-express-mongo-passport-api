import { config } from "../config/index.config";
import { userModel as User } from "../models/user.model";
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";

const options: StrategyOptions = {
  //jwtFromRequest: ExtractJwt.fromHeader("custom_header_name"),
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), //Header => Autorization : Bearer token
  secretOrKey: config.jwtSecret,
};

const JWTStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);

    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

export { JWTStrategy };
