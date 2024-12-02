import axios, { AxiosInstance, AxiosError } from 'axios';
import { Product, ProductForm } from '../types/Product';
import { LoginResponse, LoginRequest } from '../types/Admin';
import { PushNotification, SendNotification } from '@/types/PushNotification';

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
  const formData = new FormData();
  try {
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('popularity', productData.popularity);
    formData.append('category', productData.category);
    formData.append('description', productData.description);

    if (productData.image) {
      const uri = productData.image.split('.');
      console.log(uri);
      const fileType = uri[uri.length - 1];

      const file = {
        uri: productData.image,
        name: `${productData.name}.${fileType}`,
        type: `'image/${fileType}`,
      };
      console.log(file);
      formData.append('image', file as any);
    }

    const response = await URL.post<Product>('/products', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.log(formData);
    console.error('Error adding product:', error);
    throw error;
  }
};

export const patchProduct = async (id: string, productData: ProductForm): Promise<Product> => {
  try {
    const response = await URL.patch<Product>(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.log('Response : ', productData);
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    await URL.delete(`/products/${id}`);
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};


export const registerPushNotification = async (id: string, pushToken: string): Promise<PushNotification> => {
  const formData = new FormData()
  try {
    formData.append('id', id)
    formData.append('pushToken', pushToken)

    const response = await URL.post<PushNotification>('/push/register', formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })

    return response.data
  } catch (error) {
    console.log(formData)
    console.error('Error register token:', error)
    throw error
  }
}

export const deregisterPushNotification = async (id: string): Promise<void> => {
  try {
    await URL.delete(`/push/deregister/${id}`);
  } catch (error) {
    console.error('Error deleting pushToken:', error);
    throw error;
  }
}

export const sendNotification = async (inputData: { 
  title: string; 
  body: string; 
  data?: object; 
}): Promise<SendNotification> => {
  try {
    const response = await URL.post<SendNotification>('/push/send', inputData, {
      headers: {
        'Content-Type': 'application/json', 
      },
    });
    return response.data;
  } catch (error) {
    console.log(inputData);
    console.error('Error sending notification', error);
    throw error;
  }
};