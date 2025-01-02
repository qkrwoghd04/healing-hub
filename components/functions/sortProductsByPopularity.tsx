import { Product, Popularity } from '../../types/Product';

const popularity: Popularity = { High: 3, Medium: 2, Low: 1 };

export const sortProductsByPopularity = (products: Product[]): Product[] => {
  return [...products].sort((a, b) => popularity[b.popularity] - popularity[a.popularity]);
};
