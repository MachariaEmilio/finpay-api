import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
//check users of exists
export const CheckUserById = async (user_id) => {
  const user = await prisma.UserDetails.findUnique({
    where: { id: parseInt(user_id) },
  });
  if (user) {
    return 200;
  }
  return 404;
};
export const CheckUserByPhone = async (user_phone) => {
  const user = await prisma.UserDetails.findUnique({
    where: { phone: user_phone },
  });
  if (user) {
    return 200;
  }
  return 404;
};
export async function get_email(id) {
  const useremail = await prisma.userDetails.findUnique({
    where: { id: id },
    select: { email: true },
  });

  return useremail.email;
}
export async function get_password(id) {
  const useremail = await prisma.userDetails.findUnique({
    where: { id: id },
    select: {password: true },
  });

  return useremail.password;
}

