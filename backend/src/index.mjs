import express from "express";
import router from "./routers/routes.mjs";
import "dotenv/config";
import cors from "cors";
const app = express();
const port = process.env.PORT;


app.use(cors());
app.use(express.json());
app.use(router);
app.listen(port, () => {
  console.log("running on port", port);
});
