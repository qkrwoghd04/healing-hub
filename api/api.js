import axios from 'axios';

export const CLOUDFRONT_URL = 'https://dht0320g9uj4a.cloudfront.net';

const cloudfrontApi = axios.create({
  baseURL: CLOUDFRONT_URL,
});

export const fetchProducts = async () => {
  try {
    const response = await cloudfrontApi.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await cloudfrontApi.post('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    if (error.response) {
      // 서버 응답이 2xx 범위를 벗어난 경우
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      // 요청이 이루어졌으나 응답을 받지 못한 경우
      console.error('Error request:', error.request);
    } else {
      // 요청을 설정하는 중에 오류가 발생한 경우
      console.error('Error message:', error.message);
    }
    console.error('Error config:', error.config);
    throw error;
  }
};

export const addProduct = async (productData) => {
  try {
    const response = await cloudfrontApi.post('/products', productData, {
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

export const updateProduct = async (id, productData) => {
  try {
    const response = await cloudfrontApi.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await cloudfrontApi.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};
