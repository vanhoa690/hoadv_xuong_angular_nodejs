export type Bid = {
  _id: string;
  product: string;
  user: string;
  price: number;
};

export type BidForm = {
  product: string;
  user: string;
  price: number;
};
