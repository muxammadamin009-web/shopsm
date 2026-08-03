import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmail } from "../utils/sendEmail.js";


const generateCode = () => {

  return Math.floor(
    100000 + Math.random() * 900000
  ).toString();

};



const sendVerificationCode = async (user) => {

  const code = generateCode();


  user.verificationCode = code;

  user.verificationCodeExpires = new Date(
    Date.now() + 10 * 60 * 1000
  );


  await user.save();


  await sendEmail(
    user.email,
    "Verification code",
    `
      <h2>Hello ${user.name}</h2>

      <p>Your verification code:</p>

      <h1>${code}</h1>

      <p>Code expires in 10 minutes.</p>
    `
  );

};



const registerUser = async ({ name, email, password }) => {

  console.log("1. registerUser called");

  const existUser = await User.findOne({ email });

  console.log("2. User.findOne finished");

  if (existUser) {

    if (!existUser.isVerified) {

      console.log("3. resend verification");

      // await sendVerificationCode(existUser);

      return {
        message: "Verification code resent",
      };

    }

    throw new Error("User already exists");

  }

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("4. Password hashed");

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  console.log("5. USER CREATED");

  // ВРЕМЕННО ОТКЛЮЧАЕМ EMAIL
  // await sendVerificationCode(user);

  console.log("6. EMAIL SKIPPED");

  return {
    message: "Registration OK",
  };

};
export default {
  registerUser,
  verifyUser,
  resendCode,
  loginUser,
};