import { StatusCodes } from "http-status-codes";
import Product from "../models/ProductModel";
import ApiError from "../utils/ApiError";

class ProductsController {
  // GET /products
  async getAllProducts(req, res, next) {
    try {
      const products = await Product.find();
      // res.status(StatusCodes.OK).json({
      //   message: "Get All Products Done",
      //   data: products,
      // });
      res.status(StatusCodes.OK).json(products);
    } catch (error) {
      next(error);
    }
  }
  // GET /products/:id
  async getProductDetail(req, res, next) {
    try {
      const product = await Product.findById(req.params._id);

      if (!product) throw new ApiError(404, "Product Not Found");
      res.status(StatusCodes.OK).json({
        message: "Get Product Detail Done",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
  // POST /products
  async createProduct(req, res, next) {
    try {
      const newProduct = await Product.create(req.body);
      res.status(StatusCodes.CREATED).json({
        message: "Create Product Successfull",
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }
  }
  // PUT /products/:id
  async updateProduct(req, res, next) {
    try {
      const product = await Product.findByIdAndUpdate(req.params._id, req.body);
      if (!product) throw new ApiError(404, "Product Not Found");
      const updateProduct = await Product.findById(req.params._id);
      res.status(StatusCodes.OK).json({
        message: "Update Product Successfull",
        data: updateProduct,
      });
    } catch (error) {
      next(error);
    }
  }
  // DELETE /products/:id
  async deleteProduct(req, res, next) {
    try {
      const product = await Product.findByIdAndDelete(req.params._id);
      if (!product) throw new ApiError(404, "Product Not Found");
      res.status(StatusCodes.OK).json({
        message: "Delete Product Done",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default ProductsController;
