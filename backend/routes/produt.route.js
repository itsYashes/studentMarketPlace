import express from "express";
import { getAllProducts ,createProduct,deleteProduct,getProductsByCategory} from "../controllers/product.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { updateProductStatus } from "../controllers/product.controller.js";

const router = express.Router();


router.get("/",protectRoute,getAllProducts);
router.post("/",protectRoute,createProduct);
router.delete("/:id",deleteProduct);
router.get("/category/:category",getProductsByCategory);



router.put("/update-status/:id",protectRoute,updateProductStatus);




export default router;