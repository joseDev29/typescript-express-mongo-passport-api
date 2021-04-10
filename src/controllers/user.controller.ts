import { Request, Response, NextFunction } from "express";
import { userModel as User, userInterface } from "../models/user.model";
import { createToken } from "../utils/jwt";

const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "email and password are required",
    });
  }

  const verifyExistence = await User.findOne({ email });

  if (verifyExistence) {
    return res.status(400).json({
      error: "user already exists",
    });
  }

  const user = new User({
    email,
    password,
  });

  const saveResult = await user.save();

  return res.status(201).json({
    message: "signup success",
    data: {
      email: saveResult.email,
    },
  });
};

const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response> => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      error: "email and password are required",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      error: "email or password  incorrect",
    });
  }

  const compareResult = await user.comparePassword(password);

  if (!compareResult) {
    return res.status(400).json({
      error: "email or password  incorrect",
    });
  }

  const token = createToken({
    id: user.id,
    email: user.email,
  });

  return res.status(200).json({
    message: "signin success",
    data: {
      token,
    },
  });
};

export { signUp, signIn };
