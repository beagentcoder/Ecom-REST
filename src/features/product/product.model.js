import UserModel from "../user/user.model.js";
import ApplicationError from "../../error-handler/appError.js";
export default class ProductModel {
  constructor(id, name, desc, price, imageUrl, category, sizes) {
    this.id = id;
    this.name = name;
    this.desc = desc;
    this.price = price;
    this.imageUrl = imageUrl;
    this.category = category;
    this.sizes = sizes;
  }

  static getAll() {
    return products;
  }
  static addProduct(product) {
    (product.id = products.length + 1), products.push(product);
    return product;
  }
  static getById(id) {
    return products.find((product) => product.id === id);
  }
  static filter(minPrice, maxPrice, category) {
    const result = products.filter((product) => {
      return (
        (!minPrice || product.price >= minPrice) &&
        (!maxPrice || product.price <= maxPrice) &&
        (!category || product.category == category)
      );
    });
    return result;
  }
  static rateProduct(userId, productId, rating) {
    productId = parseFloat(productId);
    userId = parseFloat(userId);

    const user = UserModel.getAll().find((u) => u.id === userId);

    if (!user) {
      throw new ApplicationError("User Not Found",400);
    }
    const product = products.find((p) => p.id === productId);

    if (!product) {
      throw new ApplicationError("Product Not Found",400);
    }

    //check rating array, if not create

    if (!product.ratings) {
      product.ratings = [];
      product.ratings.push({ userId: userId, rating: rating });
    } else {
      const userRatingIndex = product.ratings.findIndex(
        (r) => r.userId === userId
      );
      if (userRatingIndex >= 0) {
        //check if user has given a rating ...then replace
        product.ratings[userRatingIndex] = {
          userId: userId,
          rating: rating,
        };
      } else {
        //if no rating by user push new rating
        product.ratings.push({ userId: userId, rating: rating });
      }
    }
    console.log(product);
  }
}

var products = [
  new ProductModel(
    1,
    "Product 1",
    "Description for Product 1",
    19.99,
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
    "Category1",
    []
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description for Product 2",
    29.99,
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg",
    "Category2",
    ["M", "XL"]
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description for Product 3",
    39.99,
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg",
    "Category3",
    ["M", "XL", "S"]
  ),
];
