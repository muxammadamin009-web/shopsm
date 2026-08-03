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

  const existUser = await User.findOne({ email });

  if (existUser) {

    if (!existUser.isVerified) {

      await sendVerificationCode(existUser);

      return {
        message: "Verification code resent",
      };

    }

    throw new Error("User already exists");

  }

  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

  const user = await User.create({

    name,

    email,

    password: hashedPassword,

  });

  await sendVerificationCode(user);

  return {

    message: "Verification code sent",

  };

};

const verifyUser = async ({ email, code }) => {

  const user = await User.findOne({ email });

  if (!user) {

    throw new Error("User not found");

  }

  if (user.verificationCode !== code) {

    throw new Error("Wrong verification code");

  }

  if (user.verificationCodeExpires < new Date()) {

    throw new Error("Code expired");

  }

  user.isVerified = true;

  user.verificationCode = undefined;

  user.verificationCodeExpires = undefined;

  await user.save();

  const token = jwt.sign(

    {

      id: user._id,

      role: user.role,

    },

    process.env.JWT_SECRET,

    {

      expiresIn: "10y",

    }

  );

  return {

    token,

    user: {

      _id: user._id,

      name: user.name,

      email: user.email,

      role: user.role,

    },

  };

};

const resendCode = async ({ email }) => {

  const user = await User.findOne({ email });

  if (!user) {

    throw new Error("User not found");

  }

  if (user.isVerified) {

    throw new Error("Email already verified");

  }
  console.log("1");
const existUser = await User.findOne({ email });

console.log("2");

const hashedPassword = await bcrypt.hash(password, 10);

console.log("3");

const user = await User.create({
  name,
  email,
  password: hashedPassword,
});

console.log("4");

// если используешь Brevo
await sendVerificationCode(user);

console.log("5");






  return {

    message: "New verification code sent",

  };

};

const loginUser = async ({ email, password }) => {

  const user = await User.findOne({ email });

  if (!user) {

    throw new Error("User not found");

  }

  if (!user.isVerified) {

    throw new Error("Verify your email first");

  }

  const isMatch = await bcrypt.compare(

    password,

    user.password

  );

  if (!isMatch) {

    throw new Error("Invalid password");

  }

  const token = jwt.sign(

    {

      id: user._id,

      role: user.role,

    },

    process.env.JWT_SECRET,

    {

      expiresIn: "7d",

    }

  );

  return {

    token,

    user: {

      _id: user._id,

      name: user.name,

      email: user.email,

      role: user.role,

    },

  };

};

export default {

  registerUser,

  verifyUser,

  resendCode,

  loginUser,

};