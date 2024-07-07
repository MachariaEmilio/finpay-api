import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";
const prisma = new PrismaClient();
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
    body.timestamp = new Date().toISOString();

    const randomId = uuidv4();
    console.log(randomId);
    body.transaction_id = randomId;
    console.log(body);
    const newtransaction = await prisma.transactionrecord.create({
      data: body,
    });
    res.status(200).json({ data: newtransaction });
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};