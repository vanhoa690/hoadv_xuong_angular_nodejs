export type BidForm = {
  product: string;
  bids: string[];
  user: string;
  price: number;
};

export type Bid = BidForm & {
  _id: string;
};
