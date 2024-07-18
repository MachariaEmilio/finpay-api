import nodemailer from "nodemailer";
import {
  checkbalance,
  checknames,
} from "../helperfunctions/transaction helper funtions/transaction.mjs";
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "thenerdmobileservices@gmail.com",
    pass: "kdke gvaw ldhr ugkk",
  },
});
export async function send_email(receiver_email, body) {
  const names = await checknames(body.sender_id);
  let mailOptions = {
    to: receiver_email,
    subject: "confirmation message",
    text: `${body.transaction_id} Confirmed ,you have received ${
      body.amount
    } KSH from  ${names.Fname} ${names.Sname} ${body.sender_id} on ${
      body.timestamp
    } ,your new balance is ${await checkbalance(body.receiver_id)}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
}
export async function send_email_to_sender(sender_email, body) {
  const names = await checknames(body.receiver_id);
  let mailOptions = {
    to: sender_email,
    subject: "confirmation message",
    text: `${body.transaction_id} Confirmed ,you have succesfully sent  ${
      body.amount
    } KSH to   ${names.Fname} ${names.Sname} ${body.receiver_id} on ${
      body.timestamp
    } ,your new balance is ${await checkbalance(body.sender_id)}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
}
// const data = {
//   transaction_id: "118f1335-c066-4c07-b54e-0147f99fffe6",
//   receiver_id: 2,
//   sender_id: 1,
//   amount: 9,
//   timestamp: "2024-07-09T07:31:16.346Z",
// };
// send_email("emiliowanchez32@gmail.com", data);

// send otp
export const send_otp = (receiver_id) => {
  let otp = Math.floor(Math.random(10) * 1000000);
  console.log(otp);
  let mailOptions = {
    to: receiver_id,
    subject: "confirmation code",
    text: `please enter the following confirmation code ${otp}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
  return otp;
};
// send_otp("emiliowanchez@gmail.com");
export const send_notification = (receiver_id, text) => {
  let mailOptions = {
    to: receiver_id,
    subject: "notification message ",
    text: text,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
  return 200;
};
