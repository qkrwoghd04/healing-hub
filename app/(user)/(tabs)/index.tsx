import React from 'react';
import { SafeAreaView, View, Linking } from 'react-native';
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
// Components
import Header from '../../../components/Header';
import HotProductScroll from '../../../components/HotProductScroll';
import CallButton from '../../../components/CustomButton';
import FlatGridProduct from '../../../components/FlatGridProduct';
// import { LoadingSpinner } from '../../../components/LoadingSpinner';
// import { ErrorMessage } from '../../../components/ErrorMessage';
// API

const HomeScreen = () => {
  // if (loading) {
  //   return <LoadingSpinner color="#0066cc" />;
  // }

  // if (error) {
  //   return (
  //     <ErrorMessage
  //       error={error}
  //       onRetry={refreshProducts}
  //       message="상품 정보를 불러오는데 실패했습니다."
  //     />
  //   );
  // }
  console.log('[Main Home] Rendered');

  function makePhoneCall() {
    Linking.openURL('tel:010-4040-1669');
  }
  return (
    <SafeAreaView className="flex-1 relative">
      <View className="flex-1 items-center">
        <Header
          name="힐링 허브"
          iconRight={<MaterialIcons name="manage-accounts" size={48} color="black" />}
          iconLeft={<AntDesign name="search1" size={28} color="black" />}
          leftRoute="/search"
          rightRoute="/(admin)/login"
        />
        <HotProductScroll />
        <FlatGridProduct dimension={80} setName={true} title={true} height="h-[45%]" />
        <CallButton
          onPress={makePhoneCall}
          buttonStyle="w-full h-full flex justify-center items-center rounded-2xl bg-[#20284F]"
          textStyle="text-4xl font-SpoqaMedium color-white"
          text="매장 주문"
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
