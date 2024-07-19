import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();
import {
  deposit_amount,
  widthdraw_amount,
} from "../helperfunctions/transaction helper funtions/transaction.mjs";

import { send_email, send_email_to_sender } from "../middlewares/emailsender.mjs";
import { get_email } from "../helperfunctions/checkuser.mjs";

// gets all taransactions for everyone
export const getalltransactions = async (req, res) => {
  try {
    const transactions = await prisma.transactionrecord.findMany();
    res.send({ data: { transactions } });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};
// intiates a new trasaction

export const createatransaction = async (req, res) => {
  try {
    const { body } = req;
    // deposit to the user
    await widthdraw_amount(body.sender_id, body.amount);
    await deposit_amount(body.receiver_id, body.amount);

    body.timestamp = new Date().toISOString();

    const randomId = uuidv4();

    body.transaction_id = randomId;
    const receiveremail=await  get_email(body.receiver_id)
    
    const senderemail = await get_email(body.sender_id);
    const{password ,...transactionhistorydata}= body
    // send to receiver
await send_email_to_sender(senderemail,body)
// sends to receiver 
    await send_email(receiveremail,body);

    const newtransaction = await prisma.transactionrecord.create({
      data: transactionhistorydata,
    });
    res.status(200).json({ status:200,data: newtransaction });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};
