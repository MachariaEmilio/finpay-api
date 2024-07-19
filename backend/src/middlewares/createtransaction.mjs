import { validationResult } from "express-validator";
import {
  CheckUserById,
  get_email,
  get_password,
} from "../helperfunctions/checkuser.mjs";
import {
  balance,
  checkbalance,
} from "../helperfunctions/transaction helper funtions/transaction.mjs";
import { send_notification } from "./emailsender.mjs";

export const verify_registration_data = async (req, res, next) => {
  const errorresult = validationResult(req);
  if (!errorresult.isEmpty()) {
    res.send(errorresult);
  } else {
    const { body } = req;

    const senderexists = await CheckUserById(body.sender_id);
    const receiverexists = await CheckUserById(body.receiver_id);
    const senderemail = await get_email(body.sender_id);

    if (senderexists !== 200) {
      res.status(404).send("User is  not registered");
    } else {
      if (body.password !== (await get_password(body.sender_id))) {
        send_notification(senderemail, "you entered an incorrect password ");
        res.status(404).send("you entered incorrect password ");
      } else {
        if (receiverexists !== 200) {
          send_notification(
            senderemail,
            "The receiver id you entered does not exist ,please try checking the id you entered"
          );
          res.status(404).send("receiver does not exist");
        } else {
          if (body.amount <= 0) {
            res.status(404).send("the minimum amount you can send is  ksh 1");
          } else {
            const sender_amount = await balance(body.sender_id, body.amount);
            if (sender_amount === 200) {
              next();
            } else {
              send_notification(
                senderemail,
                `You have insufficient balance .Your balance is${await checkbalance(
                  body.sender_id
                )} `
              );
              res.status(404).send("you have insufficient balance");
            }
          }
        }
      }
    }
  }
};
