export type Product = {
  id: string;
  _id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  isShow: boolean;
  bidInfo?: any;
};

export type CreateProductForm = {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  isShow: boolean;
};
