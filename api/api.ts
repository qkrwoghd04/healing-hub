import axios, { AxiosInstance, AxiosError } from 'axios';
import { Product,ProductForm } from '../types/Product';
import { LoginResponse, LoginRequest } from '../types/Admin';

export const BASEURL = 'https://dht0320g9uj4a.cloudfront.net';

const URL: AxiosInstance = axios.create({
  baseURL: BASEURL,
});

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await URL.get<Product[]>('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await URL.post<LoginResponse>('/login', credentials);

    // 서버에서 반환된 사용자 데이터 확인
    const userData = response.data;

    // 유저의 role이 admin인 경우에만 로그인 성공으로 처리
    if (userData.role === 'admin') {
      console.log('로그인 성공:', userData);
      return userData; // 로그인 응답을 반환
    } else {
      console.error('권한이 없습니다. 관리자로 로그인해주세요.');
      throw new Error('관리자 권한이 필요합니다.');
    }
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Error logging in:', error);

    if (axiosError.response) {
      console.error('Error data:', axiosError.response.data);
      console.error('Error status:', axiosError.response.status);
      console.error('Error headers:', axiosError.response.headers);
    } else if (axiosError.request) {
      console.error('Error request:', axiosError.request);
    } else {
      console.error('Error message:', axiosError.message);
    }
    throw error; // 오류가 발생하면 예외를 던져 호출하는 곳에서 처리하게 합니다.
  }
};

export const addProduct = async (productData: ProductForm): Promise<Product> => {
  try {
    const formData = new FormData();
    
    // 일반 필드 추가
    formData.append('name', productData.name);
    formData.append('description', productData.description);
    formData.append('price', productData.price);
    formData.append('popularity', productData.popularity);
    formData.append('category', productData.category);
    
    // 이미지 처리
    if (productData.image) {
      formData.append('image', {
        uri: productData.image.uri,
        type: productData.image.type,
        name: productData.image.name,
      } as any);
    }

    const response = await URL.post<Product>('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    throw error;
  }
};

// export const updateProduct = async (id: string, productData: ProductFormData): Promise<Product> => {
//   try {
//     const response = await URL.put<Product>(`/products/${id}`, productData);
//     return response.data;
//   } catch (error) {
//     console.error('Error updating product:', error);
//     throw error;
//   }
// };

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await URL.delete(`/products/${id}`);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
