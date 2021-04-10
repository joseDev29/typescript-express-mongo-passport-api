import mongoose, { ConnectionOptions } from "mongoose";
import { config } from "../config/index.config";

const dbOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose.connect(`${config.mongoURI}`, dbOptions);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("mongo db connected");
});

connection.on("error", (err) => {
  console.log(err.message);
  process.exit(0);
});
