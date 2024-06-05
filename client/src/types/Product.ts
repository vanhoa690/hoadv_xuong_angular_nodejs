import { Bid } from './Bid';

export type Product = {
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  isShow: boolean;
  bidTime: number;
  startAt: Date;
  endAt: Date;
  bids: Bid[];
};

export type ProductForm = {
  title: string;
  price: number;
  description: string;
  // category: string;
  image: string;
  isShow: boolean;
};
