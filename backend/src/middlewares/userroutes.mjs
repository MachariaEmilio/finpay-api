import { validationResult } from "express-validator";
import {
  CheckUserById,
  CheckUserByPhone,
} from "../helperfunctions/checkuser.mjs";

// this middleware veries the data before posting or regitering the user
export const registeruser = async (req, res, next) => {
  try {
    const errorresults = validationResult(req);
    if (!errorresults.isEmpty()) {
      res.send(errorresults);
    } else {
      const { body } = await req;

      const idexist = await CheckUserById(body.id);
      const phoneExist = await CheckUserByPhone(body.phone);
      

      if (idexist === 200 && phoneExist === 200) {
        res.status(404).send({ error: "id & phone already exists" });
      } else if (idexist === 200) {
        res.status(404).send({ error: "id already exists" });
      } else if (phoneExist === 200) {
        res.status(404).send({ error: "phone already exists" });
      } else {
        next();
      }
    }
  } catch (error) {
    console.error("Error creating user:", error);
  }
};