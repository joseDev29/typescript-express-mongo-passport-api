import { app } from "./app";
import "./db/mongodb";

app.listen(app.get("port"), () => {
  console.log(`Server listenning on http://localhost:${app.get("port")}`);
});
