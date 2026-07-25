import { Router } from "express";
import customerController from "../controller/customerController.js";
import auth from "../middleware/auth.js";


const router = Router();


router.post(
  "/",
  auth,
  customerController.create
);


router.get(
  "/",
  auth,
  customerController.getAll
);


router.get(
  "/:id",
  auth,
  customerController.getById
);


router.put(
  "/:id",
  auth,
  customerController.update
);


router.delete(
  "/:id",
  auth,
  customerController.remove
);


export default router;