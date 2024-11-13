import { Product, Popularity } from '../../types/Product';

const popularity: Popularity = { High: 1, Medium: 2, Low: 3 };

export const sortProductsByPopularity = (products: Product[]): Product[] => {
  return [...products].sort((a, b) => popularity[a.popularity] - popularity[b.popularity]);
};