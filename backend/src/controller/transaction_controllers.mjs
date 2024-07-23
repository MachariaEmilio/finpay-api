import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();
import {
  checkbalance,
  checknames,
  deposit_amount,
  widthdraw_amount,
} from "../helperfunctions/transaction helper funtions/transaction.mjs";

import {
  send_email,
  send_email_to_sender,
} from "../middlewares/emailsender.mjs";
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
    const receiveremail = await get_email(body.receiver_id);

    const senderemail = await get_email(body.sender_id);
    const { password, ...transactionhistorydata } = body;
    // send to sender
    
    await send_email_to_sender(senderemail, body);
    // sends to receiver
    await send_email(receiveremail, body);

    const newtransaction = await prisma.transactionrecord.create({
      data: transactionhistorydata,
    });
    res.status(200).json({ status: 200, data: newtransaction });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const getTransactionRecord = async (req, res) => {
  const {
    params: { id },
  } = req;
  // get transactions which the user sent
  const usersent = await prisma.transactionrecord.findMany({
    where: {
      sender_id: parseInt(id),
    },
  });

  const sent_transactions = usersent.map((item) => ({
    ...item,
    amount: `-${item.amount}`,
    id: item.receiver_id,
  }));

  for (let i = 0; i < sent_transactions.length; i++) {
    const fullname = await checknames(sent_transactions[i].receiver_id);
    sent_transactions[i].fullname = `${fullname.Fname} ${fullname.Sname}`;
  }

  const userReceived = await prisma.transactionrecord.findMany({
    where: { receiver_id: parseInt(id) },
  });

  const received_transactions = userReceived.map((item) => ({
    ...item,
    amount: (item.amount = `+${item.amount}`),
    id: item.sender_id,
  }));
  for (let i = 0; i < received_transactions.length; i++) {
    const fullname = await checknames(received_transactions[i].sender_id);
    received_transactions[i].fullname = `${fullname.Fname} ${fullname.Sname}`;
  }

  const Alltransactions = [...sent_transactions, ...received_transactions];
  Alltransactions.sort((b, a) => new Date(a.timestamp) - new Date(b.timestamp));
  
 function formatDateTime(dateString) {
  const date = new Date(dateString);

  const options = { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
  };
  const datePart = date.toLocaleDateString('en-US', options);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;

  const timePart = `${hours}:${minutesStr} ${ampm}`;

  return `${datePart}, ${timePart}`;
}
for(let i=0;i<Alltransactions.length;i++ )
{
  Alltransactions[i].timestamp=  formatDateTime(Alltransactions[i].timestamp)
}
  res.json(
    // sent:
    // sent_transactions
    // received: received_transactions
    // // ,received:userReceived,
    Alltransactions,
  );
};
