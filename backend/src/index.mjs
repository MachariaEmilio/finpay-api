import express from "express";
import router from "./routers/routes.mjs";
import "dotenv/config";

const app = express();
app.use(router);
app.use(express.json());
const port = process.env.PORT;
app.listen(port, () => {
  console.log("running on port", port);
});
