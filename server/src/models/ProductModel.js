import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    // category: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Category",
    // },
    isShow: {
      type: Boolean,
      default: true,
    },
    bidSession: {
      type: Schema.Types.ObjectId,
      ref: "BidSession",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
