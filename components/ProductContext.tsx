import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { fetchProducts, addProduct, deleteProduct, patchProduct } from '../api/api';
import { Product, ProductForm } from '@/types/Product';

const ProductContext = createContext<
  | {
      products: Product[];
      addNewProduct: (productData: ProductForm) => Promise<Product>;
      removeProduct: (id: string) => Promise<void>;
      updateProduct: (id: string, productData: ProductForm) => Promise<Product>;
      refreshProducts: () => Promise<void>;
    }
  | undefined
>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  // 상품 불러오기
  const loadProducts = useCallback(async () => {
    const fetchedProducts = await fetchProducts();
    setProducts(fetchedProducts);
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // 상품 추가
  const addNewProduct = useCallback(async (productData: ProductForm) => {
    const newProduct = await addProduct(productData);
    setProducts((prev) => [...prev, newProduct]);
    return newProduct;
  }, []);

  // 상품 삭제
  const removeProduct = useCallback(async (id: string) => {
    await deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // 상품 업데이트
  const updateProduct = useCallback(async (id: string, productData: ProductForm) => {
    const updatedProduct = await patchProduct(id, productData);
    setProducts((prev) => prev.map((product) => (product.id === id ? updatedProduct : product)));
    return updatedProduct;
  }, []);

  // 상품 새로고침
  const refreshProducts = useCallback(async () => {
    await loadProducts();
  }, [loadProducts]);

  const value = {
    products,
    addNewProduct,
    removeProduct,
    updateProduct,
    refreshProducts,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

// 커스텀 훅도 타입을 명확히 지정
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
