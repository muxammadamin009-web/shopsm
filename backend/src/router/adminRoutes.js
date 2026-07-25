import { Router } from "express";
import adminController from "../controller/adminController.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const router = Router();

router.get(
  "/stats",
  auth,
  admin,
  adminController.getStats
);

export default router;