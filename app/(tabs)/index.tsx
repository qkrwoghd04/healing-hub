import React from 'react';
import { SafeAreaView, Linking } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
// Components
import Header from '../../components/Header';
import HotProductScroll from '../../components/HotProductScroll';
import CallButton from '../../components/CustomButton';
import FlatGridProduct from '../../components/FlatGridProduct';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { ErrorMessage } from '../../components/ErrorMessage';
// API
import { useProducts } from '../../components/ProductContext';

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
  console.log('[Main Home] Rendered');
  
  function makePhoneCall (){
    Linking.openURL('tel:010-4040-1669');
  };
  return (
    <SafeAreaView className="flex relative h-full w-full">
      <Header
        name="힐링허브"
        icon={<MaterialIcons name="manage-accounts" size={48} color="black" />}
        route="/(admin)/login"
      />
      <HotProductScroll products={products} />
      <FlatGridProduct dimension={80} setName={true} title={true} height='h-[45%]'/>
      <CallButton onPress={makePhoneCall} color="bg-white" text="매장 주문"/>
    </SafeAreaView>
  );
};

export default HomeScreen;