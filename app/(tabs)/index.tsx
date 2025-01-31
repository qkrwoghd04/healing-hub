import React from 'react';
import { SafeAreaView, View, Linking, StatusBar, StyleSheet } from 'react-native';

// Components
import Header from '../../components/Header';
import HotProductScroll from '../../components/HotProductScroll';
import Button from '../../components/Button';
import FlatGridProduct from '../../components/FlatGridProduct';

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

  const makePhoneCall = () => {
    Linking.openURL('tel:010-4040-1669');
  }

  return (
    <SafeAreaView style={styles.homeContainer}>
      <StatusBar backgroundColor={'#f3f4f6'} />
      <Header title="힐링 허브" />
      <HotProductScroll />
      <FlatGridProduct dimension={100} setName={true} title={false} height="h-[47%]" />
      <Button
        onPress={makePhoneCall}
        buttonStyle="primary"
        text="매장 주문"
        textSize="lg"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    backgroundColor: "rgb(253,253,253)",
    justifyContent: "center",
    alignItems: "center"
  },
})

export default HomeScreen;
