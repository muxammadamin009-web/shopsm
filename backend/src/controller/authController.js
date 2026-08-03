import authService from "../services/authService.js";

const register = async (req, res) => {

  try {

    const result = await authService.registerUser(req.body);

    return res.status(201).json(result);

  } catch (error) {

    console.error("REGISTER ERROR:", error);

    return res.status(400).json({
      message: error.message,
    });

  }

};

const verify = async (req, res) => {

  try {

    const result = await authService.verifyUser(req.body);

    return res.status(200).json(result);

  } catch (error) {

    console.error("VERIFY ERROR:", error);

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

    console.error("RESEND ERROR:", error);

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

    console.error("LOGIN ERROR:", error);

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