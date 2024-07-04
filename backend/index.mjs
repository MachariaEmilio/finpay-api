import express from "express";
import router from "./routers/routes.mjs";

const app = express();
app.use(router);
app.use(express.json());

app.listen(3000, () => {
  console.log("running on port 3000");
});
