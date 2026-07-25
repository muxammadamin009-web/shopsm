import { Router } from "express";
import orderController from "../controller/orderController.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const router = Router();


router.post(
  "/",
  auth,
  orderController.create
);


router.get(
  "/my",
  auth,
  orderController.myOrders
);


router.get(
  "/",
  auth,
  admin,
  orderController.getAll
);


router.put(
  "/:id/status",
  auth,
  admin,
  orderController.updateStatus
);

export default router;