import React from 'react';
import { SafeAreaView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
// Components
import Header from '../../components/Header';
import HotProductScroll from '../../components/HotProductScroll';
import CallButton from '../../components/CallButton';
import FlatGridProduct from '../../components/FlatGridProduct';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
// API
import { ProductProvider, useProducts } from '../../components/ProductContext';

const HomeScreen = () => {
  const { products, loading, error, refreshProducts } = useProducts();

  if (loading) {
    return <LoadingSpinner color="#0066cc" />;
  }

  if (error) {
    return (
      <ErrorMessage
        error={error}
        onRetry={refreshProducts}
        message="상품 정보를 불러오는데 실패했습니다."
      />
    );
  }
  console.log('Main Home');
  // useEffect(() => {
  //   const backAction = () => {
  //     Alert.alert('앱 종료', '앱을 종료하시겠습니까?', [
  //       {
  //         text: '취소',
  //         onPress: () => null,
  //         style: 'cancel',
  //       },
  //       {
  //         text: '종료',
  //         onPress: () => BackHandler.exitApp(),
  //       },
  //     ]);
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

  //   return () => backHandler.remove();
  // }, []);

  return (
    <SafeAreaView className="flex bg-white relative h-full w-full">
      <ProductProvider>
        <Header
          name="힐링허브"
          icon={<MaterialIcons name="admin-panel-settings" size={48} color="black" />}
          route="/(admin)/login"
        />
        <HotProductScroll products={products} />
        <FlatGridProduct dimension={80} setName={true} title={true} />
        <CallButton />
      </ProductProvider>
    </SafeAreaView>
  );
};

export default HomeScreen;