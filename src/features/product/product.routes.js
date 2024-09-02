// Manage routes/paths to ProductController
import {uploadFile} from '../../middlewares/file.upload.middleware.js';
// 1. Import express.
import express from 'express';
import ProductController from './product.controller.js';

// 2. Initialize Express router.
const productRouter = express.Router();
const productController = new ProductController();

// All the paths to the controller methods.
// localhost/api/products 
productRouter.post("/rate",productController.rateProduct)
productRouter.get('/', productController.getAllProducts);
productRouter.post('/', uploadFile.single("imageUrl") ,productController.addProduct);
productRouter.get("/filter",productController.filterProducts)
productRouter.get('/:id',productController.getOneProduct)




export default productRouter;