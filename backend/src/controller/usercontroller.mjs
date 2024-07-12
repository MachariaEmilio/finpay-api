import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// gets one user
export const getauser = async (req, res) => {
  try {
    const {
      params: { id },
    } = req;
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
// gets all users in the database
export const getalluser = async (req, res) => {
  try {
    const all_user = await prisma.UserDetails.findMany();
    res.send(all_user);
  } catch (error) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

//inserts user to the database after error handling and
//  verification of certain factors ie unique and the expected datatypes are complete
export const post_user = async (req, res) => {
  const { body } = req;

  const newUser = await prisma.UserDetails.create({
    data: body,
  });
  res.status(201).send(newUser);
};
export const log_in_user = async (req, res) => {
  
  const {
    params: { id ,password },
  } = req;

  const userbyid = await prisma.UserDetails.findUnique({
    where: { id: parseInt(id) },
  });
  if (userbyid) {
    if (
      parseInt(id) === userbyid.id &&
      password === userbyid.password
    ) {
      res
        .status(200)
        .send({
          status: 200,
          statusmessage: "ok",
          Message: "login successful",
        });
    }else{
      res.status(200).send({
        status: 401,
        statusmessage: "failed",
        Message: "invalid credentials",
    })}
  } else {
    res.status(200).send({
      status: 401,
      statusmessage: "failed",
      Message: "invalid credentials",
    });
  }
};
