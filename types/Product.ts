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

export const CategoryImgMap = [
  { name: '비타민 및 미네랄', imgKey: '비타민_및_미네랄' },
  { name: '콜라겐 및 피부건강', imgKey: '콜라겐_및_피부건강' },
  { name: '소화 및 장 건강', imgKey: '소화_및_장_건강' },
  { name: '오메가3 및 혈관 건강', imgKey: '오메가3_및_혈관_건강' },
  { name: '관절 건강', imgKey: '관절_건강' },
  { name: '면역 강화', imgKey: '면역_강화' },
  { name: '기타 건강 보조제', imgKey: '기타_건강_보조제' },
];