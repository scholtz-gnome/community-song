import { newApp } from "./app";
import * as http from "http";

const app = newApp();
const port = process.env.PORT || "4000";

http.createServer({}, app).listen(port, () => {
  console.log(`Listening for requests on port ${port}`);
});
