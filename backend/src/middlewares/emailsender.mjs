import nodemailer from "nodemailer";
import { checkbalance, checknames } from "../helperfunctions/transaction helper funtions/transaction.mjs";
let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "emiliogabu@gmail.com",
      pass: "xuugykuiqwtbaqwc",
    },
  });
export async function send_email(receiver_email ,body) {
 
const names = await checknames(body.sender_id)
    let mailOptions = {
        from: "<emiliogabu@gmail.com>", // sender address
        to: receiver_email, // list of receivers
        subject: "confirmation message", // Subject line
       text: `${body.transaction_id} Confirmed ,you have received ${body.amount} KSH from  ${names.Fname} ${names.Sname} ${body.sender_id} on ${body.timestamp} new balance is ${await checkbalance(body.receiver_id)}`,     // plain text body
      };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
}
const data={
    "transaction_id": "118f1335-c066-4c07-b54e-0147f99fffe6",
    "receiver_id": 2,
    "sender_id": 1,
    "amount": 9,
    "timestamp": "2024-07-09T07:31:16.346Z"
  }
// send_email("emiliowanchez@gmail.com",data)