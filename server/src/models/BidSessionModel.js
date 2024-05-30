import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BidSessionSchema = new Schema(
  {
    product: {
      type: [Schema.Types.ObjectId],
      ref: "Product",
    },
    start: {
      type: Date,
    },
    end: {
      type: Date,
    },
    bids: {
      type: [Schema.Types.ObjectId],
      ref: "Bid",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const BidSession = mongoose.model("BidSession", BidSessionSchema);

export default BidSession;
