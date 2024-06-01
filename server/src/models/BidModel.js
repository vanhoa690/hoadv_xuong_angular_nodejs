import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BidSchema = new Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    price: {
      type: Number,
      required: true,
    },
    isWinBid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Bid = mongoose.model("Bid", BidSchema);

export default Bid;
