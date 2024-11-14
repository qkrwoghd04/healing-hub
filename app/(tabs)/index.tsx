import React, { useEffect } from 'react';
import { SafeAreaView } from '../../components/StyledComponents';
import { Alert, BackHandler } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
// Components
import Header from '../../components/Header';
import HotProductScroll from '../../components/HotProductScroll';
import CallButton from '../../components/CallButton';
import FlatGridProduct from '../../components/FlatGridProduct';

// API
import { useProducts } from '../../api/ProductContext';


const HomeScreen = () => {
  const  { products }  = useProducts();

  useEffect(() => {
    const backAction = () => {
      Alert.alert('앱 종료', '앱을 종료하시겠습니까?', [
        {
          text: '취소',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: '종료',
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  return (
    <SafeAreaView className="flex bg-white relative h-full w-full">
      <Header 
        name="힐링허브" 
        icon={<MaterialIcons name="admin-panel-settings" size={48} color="black" />}
        route="/(admin)/login" 
      />
      <HotProductScroll products={products} />
      <FlatGridProduct
        dimension={80}
        setName={true}
        title={true}
      />
      <CallButton />
    </SafeAreaView>
  );
};

export default HomeScreen;
