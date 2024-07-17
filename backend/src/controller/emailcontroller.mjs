import { send_otp } from "../middlewares/emailsender.mjs"

export async function send_email_otp(req,res){
    const {params:{receiveremail}}=req
const otp =  await  send_otp(receiveremail)
res.status(200).json(
    {Otp:otp}
)

}