export type Product = {
  id: string;
  category: Category;
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

export type Category =
  | '비타민 및 미네랄'
  | '콜라겐 및 피부건강'
  | '소화 및 장 건강'
  | '오메가3 및 혈관 건강'
  | '관절 건강'
  | '면역 강화'
  | '기타 건강 보조제';

export type ProductForm = Pick<
  Product,
  'category' | 'description' | 'name' | 'popularity' | 'price' | 'image'
>;

export const CategoryImgMap = [
  { name: '비타민 및 미네랄', imgKey: 'vitamin' },
  { name: '콜라겐 및 피부건강', imgKey: 'collagen' },
  { name: '소화 및 장 건강', imgKey: 'digestion' },
  { name: '오메가3 및 혈관 건강', imgKey: 'omega3' },
  { name: '관절 건강', imgKey: 'joint' },
  { name: '면역 강화', imgKey: 'immune' },
  { name: '기타 건강 보조제', imgKey: 'others' },
];
