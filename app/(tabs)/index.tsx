import React from 'react';
import { SafeAreaView, Linking, StatusBar, StyleSheet } from 'react-native';
// Components
import Header from '../../components/Header';
import Button from '../../components/Button';
import HotProductScroll from '../../components/HotProductScroll';
import FlatGridProduct from '../../components/FlatGridProduct';

const HomeScreen = () => {
  console.log('[Main Home] Rendered');

  const makePhoneCall = () => {
    Linking.openURL('tel:010-4040-1669');
  }

  return (
    <SafeAreaView style={styles.homeContainer}>
      <StatusBar backgroundColor={'#f3f4f6'} />
      <Header
        title="힐링 허브"
      />
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
