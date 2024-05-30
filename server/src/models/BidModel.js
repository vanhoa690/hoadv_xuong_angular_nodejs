import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BidSchema = new Schema(
  {
    user: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
    price: {
      type: number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Bid = mongoose.model("BidSession", BidSchema);

export default Bid;
