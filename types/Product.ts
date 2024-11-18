export type Product = {
  id: string;
  category: Category;
  description: string;
  image: { uri: string; type: string; name: string } | null;
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

export type Category =
  | '비타민 및 미네랄'
  | '콜라겐 및 피부건강'
  | '소화 및 장 건강'
  | '오메가3 및 혈관 건강'
  | '관절 건강'
  | '면역 강화'
  | '기타건강 보조제';

export type ProductForm = Pick<Product, "category" | "description" | "image" | "name" | "popularity" | "price">
