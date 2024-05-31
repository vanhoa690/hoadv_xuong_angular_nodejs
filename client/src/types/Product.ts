export type Product = {
  _id: string;
  title: string;
  price: number;
  description: string;
  // category: string;
  image: string;
  isShow: boolean;
  bidInfo?: any;
};

export type ProductForm = {
  title: string;
  price: number;
  description: string;
  // category: string;
  image: string;
  isShow: boolean;
};
