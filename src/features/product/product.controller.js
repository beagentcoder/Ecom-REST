import ApplicationError from "../../error-handler/appError.js";
import ProductModel from "./product.model.js";

export default class ProductController {
  getAllProducts(req, res) {
    const product = ProductModel.getAll();
    res.status(200).send(product);
  }
  addProduct(req, res) {
    const { name, price, sizes } = req.body;
    const newProduct = {
      name,
      price: parseFloat(price),
      sizes: sizes.split(","),
      imageUrl: req.file.filename,
    };
    const createdProduct = ProductModel.addProduct(newProduct);
    res.status(201).send(createdProduct);
  }
  rateProduct(req, res, next) {
    const userId = req.query.userId;
    const productId = req.query.productId;
    const rating = parseInt(req.query.rating);

    if (req.userId != userId) {
          throw new ApplicationError("UnAuthorized To Rate as Other User....Please Login to your account",403);
        }
    ProductModel.rateProduct(userId, productId, rating);

    res.status(200).send("Rating saved");
  }
  getOneProduct(req, res) {
    console.log("in get by id");
    const id = parseInt(req.params.id);
    const product = ProductModel.getById(id);
    if (!product) {
      res.status(404).send("Product not found");
    } else {
      return res.status(200).send(product);
    }
  }
  filterProducts(req, res) {
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    const category = req.query.category;
    const result = ProductModel.filter(minPrice, maxPrice, category);
    res.status(200).send(result);
  }
}
