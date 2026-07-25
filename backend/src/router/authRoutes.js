import { Router } from "express";
import authController from "../controller/authController.js";

const router = Router();



router.post(
  "/register",
  authController.register
);



router.post(
  "/login",
  authController.login
);



router.post(
  "/verify",
  authController.verify
);



router.post(
  "/resend",
  authController.resend
);



export default router;