import { Router } from "express";
import productController from "../controller/productController.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";

const router = Router();


router.post(
  "/",
  auth,
  admin,
  productController.create
);


// сначала category
router.get(
  "/category/:id",
  productController.getByCategory
);


router.get(
  "/",
  productController.getAll
);


router.get(
  "/:id",
  productController.getById
);



router.put(
  "/:id",
  auth,
  admin,
  productController.update
);



router.delete(
  "/:id",
  auth,
  admin,
  productController.remove
);



export default router;