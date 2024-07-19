import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import { validationResult } from "express-validator";
export const verify_login_data = async (req, res, next) => {
  const errorresult = validationResult(req);
  if (!errorresult.isEmpty()) {
    res.send(errorresult);
  } else {
   next()
    }
  }
;
