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
    from:"thenerdmobileservices@gmail.com",
    to: receiver_email,
    subject: "confirmation message",
  
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Transaction Confirmation</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                color: #333;
                margin: 0;
                padding: 20px;
            }
            .container {
                background-color: #fff;
                border: 1px solid #ddd;
                border-radius: 5px;
                padding: 20px;
                max-width: 600px;
                margin: 0 auto;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                font-size: 16px;
            }
            .transaction-id, .amount, .sender, .timestamp, .balance {
                font-weight: bold;
            }
            .transaction-id {
                color: #007bff;
                font-size: 18px;
            }
            .amount {
                color: #28a745;
                font-size: 18px;
            }
            .balance {
                color: #ffc107;
                font-size: 18px;
            }
            .sender {
                font-size: 18px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <p>
                <span class="transaction-id">${body.transaction_id}</span> Confirmed, you have received KSH 
                <span class="amount">${body.amount}</span> from 
                <span class="sender">${names.Fname} ${names.Sname} (${body.sender_id})</span> on 
                <span class="timestamp">${formatDateTime(body.timestamp)}</span>. Your new balance is KSH 
                <span class="balance">${await checkbalance(body.receiver_id)}</span>.
            </p>
        </div>
    </body>
    </html>
    `
    
  }
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
    from:"thenerdmobileservices@gmail.com",
    to: sender_email,
    subject: "confirmation message",
  html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transaction Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            font-size: 16px;
        }
        .transaction-id, .amount, .receiver, .timestamp, .balance {
            font-weight: bold;
        }
        .transaction-id {
            color: #007bff;
        }
        .amount {
            color: #28a745;
        }
        .balance {
            color: #ffc107;
        }
        .receiver {
            font-size: 18px;
        }
    </style>
</head>
<body>
    <div class="container">
        <p>
            <span class="transaction-id">${body.transaction_id}</span> Confirmed, you have successfully sent KSH 
            <span class="amount">${body.amount}</span> to 
            <span class="receiver">${names.Fname} ${names.Sname} (${body.receiver_id})</span> on 
            <span class="timestamp">${formatDateTime(body.timestamp)}</span>. Your new balance is Ksh 
            <span class="balance">${await checkbalance(body.sender_id)}</span>.
        </p>
    </div>
</body>
</html>
`

} ;
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
}
const data = {
  transaction_id: "118f1335-c066-4c07-b54e-0147f99fffe6",
  receiver_id: 2,
  sender_id: 3,
  amount: 900,
  timestamp: "2024-07-09T07:31:16.346Z",
};
send_email_to_sender("emiliowanchez32@gmail.com", data);

// send otp
export const send_otp = (receiver_id) => {
  let otp = Math.floor(Math.random(10) * 1000000);
  console.log(otp);
  let mailOptions = {
    from:"thenerdmobileservices@gmail.com",
    to: receiver_id,
    subject: "confirmation code",
    text: `Please enter the following confirmation code ${otp}`,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation Code</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            color: #333;
            margin: 0;
            padding: 20px;
        }
        .container {
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 5px;
            padding: 20px;
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            font-size: 16px;
            text-align: center;
        }
        .otp {
            font-weight: bold;
            color: #007bff;
            font-size: 24px;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <p>Please enter the following confirmation code:</p>
        <p class="otp">${otp}</p>
    </div>
</body>
</html>
`

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
    from:"thenerdmobileservices@gmail.com",
    to: receiver_id,
    subject: "Notification message ",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmation Code</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f9f9f9;
                color: #333;
                margin: 0;
                padding: 20px;
            }
            .container {
                background-color: #fff;
                border: 1px solid #ddd;
                border-radius: 5px;
                padding: 20px;
                max-width: 600px;
                margin: 0 auto;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                font-size: 16px;
                text-align: center;
            }
           
        </style>
    </head>
    <body>
        <div class="container">
            <p>${text}</p>
           
        </div>
    </body>
    </html>
    `
    
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });
  return 200;
};
// send_notification("emiliowanchez@gmail.com","you have o balance");

export function formatDateTime(dateString) {
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
