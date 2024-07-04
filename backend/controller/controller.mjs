
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getauser = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const userbyid = await prisma.UserDetails.findUnique({
      where: { id: parseInt(id) },
    });
    if (userbyid) {
      res.send(userbyid);
    } else {
      res.status(404).send({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const getalluser = async (req, res) => {
  try {
    const all_user = await prisma.UserDetails.findMany();
    res.send(all_user);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export const createauser = async (req, res) => {
  // res.json({
  //   okay:"fine"
  // })
  try {
    const { body } = req;
    console.log("Received body:", body);
    const newUser = await prisma.UserDetails.create({
      data: body,
    });
    res.status(201).send(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    if (error instanceof prisma.PrismaClientKnownRequestError) {
      // Known error from Prisma
      res.status(400).send({ error: error.message });
    } else {
      res.status(500).send({ error: "Internal Server Error" });
    }
  }
};
