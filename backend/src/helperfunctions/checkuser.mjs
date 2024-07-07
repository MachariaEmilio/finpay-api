
import { PrismaClient } from "@prisma/client";
const prisma =new  PrismaClient();
//check users of exists
export const CheckUserById = async (user_id) => {
 
  const user = await prisma.UserDetails.findUnique({ where: { id: user_id } });
  if (user !== null) {

    return 200
  } 
    return 404
  

};
export const CheckUserByPhone = async (user_phone) => {
 
  const user = await prisma.UserDetails.findUnique({ where: { phone: user_phone } });
  if (user !== null) {

    return 200
  } 
    return 404
  

};