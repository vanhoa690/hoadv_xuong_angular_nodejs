import { StatusCodes } from "http-status-codes";
import Bid from "../models/BidModel";
import ApiError from "../utils/ApiError";
import Product from "../models/ProductModel";

class BidsController {
  // GET /bids
  async getAllBids(req, res, next) {
    try {
      const bids = await Bid.find();
      res.status(StatusCodes.OK).json(bids);
    } catch (error) {
      next(error);
    }
  }
  // GET /bids/:id
  async getBidDetail(req, res, next) {
    try {
      const bid = await Bid.findById(req.params.id);

      if (!bid) throw new ApiError(404, "Bid Not Found");
      res.status(StatusCodes.OK).json(bid);
    } catch (error) {
      next(error);
    }
  }
  // POST /bids
  async createBid(req, res, next) {
    try {
      const newBid = await Bid.create(req.body);
      const product = await Product.findById(req.body.product);
      if (!product) throw new ApiError(404, "Product Not Found");
      await Product.findByIdAndUpdate(product._id, {
        bids: [...product.bids, newBid._id],
      });

      res.status(StatusCodes.CREATED).json({
        message: "Create Bid Successfull",
        data: newBid,
      });
    } catch (error) {
      next(error);
    }
  }
  // PUT /bids/:id
  async updateBid(req, res, next) {
    try {
      const updateBid = await Bid.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!updateBid) throw new ApiError(404, "Bid Not Found");
      res.status(StatusCodes.OK).json({
        message: "Update Bid Successfull",
        data: updateBid,
      });
    } catch (error) {
      next(error);
    }
  }
  // DELETE /bids/:id
  async deleteBid(req, res, next) {
    try {
      const bid = await Bid.findByIdAndDelete(req.params.id);
      if (!bid) throw new ApiError(404, "Bid Not Found");
      res.status(StatusCodes.OK).json({
        message: "Delete Bid Done",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default BidsController;
