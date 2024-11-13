export type Product = {
  id: string;
  category: string;
  description: string;
  image: string;
  name: string;
  popularity: keyof Popularity;
  price: string;
  product_detail_url: string;
};

export type Popularity = {
  High: number;
  Medium: number;
  Low: number;
};
