import { Router } from "express";
import categoryController from "../controller/categoryController.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";


const router = Router();



router.post(
  "/",
  auth,
  admin,
  categoryController.create
);



router.get(
  "/",
  categoryController.getAll
);



router.get(
  "/:id",
  categoryController.getById
);



router.put(
  "/:id",
  auth,
  admin,
  categoryController.update
);



router.delete(
  "/:id",
  auth,
  admin,
  categoryController.remove
);



export default router;