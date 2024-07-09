import { validationResult } from "express-validator";
import { CheckUserById } from "../helperfunctions/checkuser.mjs";
import { balance } from "../helperfunctions/transaction helper funtions/transaction.mjs";

export const verify_registration_data = async (req, res, next) => {
  const errorresult = validationResult(req);
  if (!errorresult.isEmpty()) {
    res.send(errorresult);
  } else {
    const { body } = req;
    const senderId = await CheckUserById(body.sender_id);
    const receiver_id = await CheckUserById(body.receiver_id);

    if (senderId !== 200) {
      res.status(404).send("you are not registered");
    } else {
      if (receiver_id !== 200) {
        res.status(404).send("receiver does not exist");
      } else {
        const sender_amount = await balance(body.sender_id, body.amount);

        if (sender_amount == 200) {
          next();
        } else {
          res.send("you have insufficient balance");
        }
      }
    }
  }
};
