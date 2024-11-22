import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { fetchProducts, addProduct, deleteProduct } from '../api/api';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // loadProducts를 useCallback으로 메모이제이션
  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Failed to load products:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        setLoading(true);
        const fetchedProducts = await fetchProducts();
        if (mounted) {
          setProducts(fetchedProducts);
        }
      } catch (error) {
        if (mounted) {
          console.error('Failed to load products:', error);
          setError(error);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    init();

    // 클린업 함수
    return () => {
      mounted = false;
    };
  }, []);

  // 메모이제이션된 추가 함수
  const addNewProduct = useCallback(async (productData) => {
    try {
      setLoading(true);
      const newProduct = await addProduct(productData);
      setProducts((prev) => [...prev, newProduct]);
      return newProduct;
    } catch (error) {
      console.error('Failed to add product:', error);
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // 메모이제이션된 삭제 함수
  const removeProduct = useCallback(async (id) => {
    try {
      setLoading(true);
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error);
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // 메모이제이션된 새로고침 함수
  const refreshProducts = useCallback(async () => {
    await loadProducts();
  }, [loadProducts]);

  const value = {
    products,
    loading,
    error,
    addNewProduct,
    removeProduct,
    refreshProducts,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

// 커스텀 훅에 loading과 error 상태 추가
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
