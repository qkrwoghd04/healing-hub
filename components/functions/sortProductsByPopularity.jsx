export const sortProductsByPopularity = (products = []) => {
  const popularityOrder = { High: 1, Medium: 2, Low: 3 };
  
  return [...products].sort((a, b) => popularityOrder[a.popularity] - popularityOrder[b.popularity])
};