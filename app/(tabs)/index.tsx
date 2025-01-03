import React from 'react';
import { SafeAreaView, View, Linking, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Components
import Header from '../../components/CustomHeader';
import HotProductScroll from '../../components/HotProductScroll';
import CallButton from '../../components/CustomButton';
import FlatGridProduct from '../../components/FlatGridProduct';
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
    <SafeAreaView className="flex-1 relative bg-gray-100">
      <StatusBar backgroundColor={'#f3f4f6'} />
      <View className="flex-1">
        <Header
          name="힐링 허브"
          iconRight={<MaterialIcons name="manage-accounts" size={48} color="black" />}
          rightRoute="/(admin)/login"
        />
        <HotProductScroll />
        <FlatGridProduct dimension={100} setName={true} title={false} height="h-[47%]" />
        <CallButton
          onPress={makePhoneCall}
          buttonStyle="w-[95%] h-full flex justify-center items-center rounded-2xl bg-navy"
          textStyle="text-4xl font-SpoqaMedium color-white"
          text="매장 주문"
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
