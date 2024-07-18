import { validationResult } from "express-validator";
import { CheckUserById, get_email } from "../helperfunctions/checkuser.mjs";
import { balance, checkbalance } from "../helperfunctions/transaction helper funtions/transaction.mjs";
import { send_notification } from "./emailsender.mjs";

export const verify_registration_data = async (req, res, next) => {
  const errorresult = validationResult(req);
  if (!errorresult.isEmpty()) {
    res.send(errorresult);
  } else {
    const { body } = req;
    const senderexists = await CheckUserById(body.sender_id);
    const receiverexists = await CheckUserById(body.receiver_id);
    
    if (senderexists !== 200) {
      res.status(200).send("you are not registered");
    } else {
      const senderemail = await get_email(body.sender_id)
      if (receiverexists!== 200) {
      send_notification(senderemail , "The receiver id you entered does not exist ,please try checking the id you entered")
        res.status(200).send("receiver does not exist");
      } else {
        const sender_amount = await balance(body.sender_id, body.amount);

        if (sender_amount == 200) {
          next();
        } else {

        send_notification(senderemail , `You have insufficient balance .Your balance is${await checkbalance(body.sender_id)} `)
          res.send("you have insufficient balance");
        }
      }
    }
  }
};
