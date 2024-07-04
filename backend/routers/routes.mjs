import express from "express";
import { Router } from "express";
import {
  createauser,
  getalluser,
  getauser,
} from "../controller/controller.mjs";
import {
  getalltransactions,
  createatransaction,
} from "../controller/transaction_controllers.mjs";

const router = Router();
router.use(express.json());
// routes to the users
router.route("/users/:id").get(getauser);
router.route("/users").get(getalluser);
router.route("/create").post(createauser);
//routes for transaction

router.route("/transactions").get(getalltransactions).post(createatransaction);
export default router;
