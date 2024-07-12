import express from "express";

import { Router } from "express";
import { checkSchema } from "express-validator";
import {
  getalluser,
  getauser,
  log_in_user,
  post_user,
} from "../controller/usercontroller.mjs";
import {
  getalltransactions,
  createatransaction,
} from "../controller/transaction_controllers.mjs";
import { verify_regusers } from "../schema/userschema.mjs";
import { registeruser } from "../middlewares/userroutes.mjs";
import { verify_transactions } from "../schema/transactionschema.mjs";
import { verify_registration_data } from "../middlewares/createtransaction.mjs";


const router = Router();
router.use(express.json());
// routes to the users
router.route("/users/:id").get(getauser);
router.route("/users").get(getalluser);
router
  .route("/registeruser")
  .post(checkSchema(verify_regusers), registeruser, post_user);
//routes for transaction
router
  .route("/login/:id/:password")
  .get( log_in_user);
router
  .route("/transactions")
  .get(getalltransactions)
  .post(
    checkSchema(verify_transactions),
    verify_registration_data,
    createatransaction
  );
export default router;
