import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

export const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `"ShopSM" <${process.env.BREVO_USER}>`,
    to,
    subject,
    html,
  });
};