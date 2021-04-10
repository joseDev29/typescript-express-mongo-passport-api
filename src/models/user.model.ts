import { model, Schema, Document, SchemaDefinition } from "mongoose";
import bcrypt from "bcrypt";

interface userInterface extends Document {
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}

//El modelo se basa en userInterface y userInterface extiende de Document
const userSchema = new Schema<userInterface>({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

userSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  const result = await bcrypt.compare(password, this.password);

  return result;
};

const userModel = model<userInterface>("User", userSchema);

export { userModel, userInterface };
