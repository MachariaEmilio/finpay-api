import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
// checks the balance
export const checkbalance = async (userid) => {
  const balance = await prisma.userDetails.findUnique({
    where: { id: userid },
    select: { balance: true },
  });

  return balance.balance;
};

export const checknames = async (userid) => {
  const names = await prisma.userDetails.findUnique({
    where: { id: userid },
    select: {
      Fname: true,
      Sname: true,
    },
  });

  return names;
};

// check if amount is greater or equal to the amount being sent
export const balance = async (id, amount) => {
  const balances = await checkbalance(id);

  if (amount <= balances) {
    return 200;
  } else {
    return 404;
  }
};
// function for depositing money and widthrawing
export const deposit_amount = async (userid, newamount) => {
  try {
    const balance = await checkbalance(userid);

    await prisma.userDetails.update({
      where: {
        id: userid,
      },
      data: {
        balance: balance + newamount,
      },
    });

    return 200;
  } catch (error) {
    console.log("error updating ", error);
  }
};

export const widthdraw_amount = async (userid, newamount) => {
  try {
    const balance = await checkbalance(userid);

    await prisma.userDetails.update({
      where: {
        id: userid,
      },
      data: {
        balance: balance - newamount,
      },
    });

    return 200;
  } catch (error) {
    console.log("error updating ", error);
  }
};
