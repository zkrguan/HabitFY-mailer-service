import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    service:'gmail', // true for 465, false for other ports
    auth: {
      user:process.env.GMAIL_ADDRESS, 
      pass:process.env.GMAIL_TOKEN, 
    }
});

