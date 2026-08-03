import authService from "../services/authService.js";

const register = async (req, res) => {
  console.log("REGISTER REQUEST");

  try {
    console.log("BODY:", req.body);

    const result = await authService.registerUser(req.body);

    console.log("RESULT:", result);

    return res.status(201).json(result);
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

const verify = async (req, res) => {
  try {
    const result = await authService.verifyUser(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};

const resend = async (req, res) => {
  try {
    const result = await authService.resendCode(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const result = await authService.loginUser(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};

export default {
  register,
  verify,
  resend,
  login,
};