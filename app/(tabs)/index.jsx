import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet, SafeAreaView } from 'react-native';
import Swiper from 'react-native-swiper';
import { useRouter } from 'expo-router';
import { useProducts } from '../contexts/ProductContext';
import FlipCard from 'react-native-flip-card';
// import FastImage from 'react-native-fast-image' eject 필요

const HomeScreen = () => {
  const router = useRouter();
  const { products } = useProducts();

  const makePhoneCall = () => {
    Linking.openURL('tel:010-4040-1669');
  };

  const navigateToAdminLogin = () => {
    router.push('/admins/login');
  };
  
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image 
          source={require('../../assets/images/logo.png')} 
          style={[styles.appNameImage, {width: 60, height: 60}]}
          />
          <Text style={[styles.title, {padding: 10, fontFamily: 'Lato-HeavyItalic', fontSize: 38}]}>Healing Hub</Text>
          <TouchableOpacity style={styles.adminIconContainer} onPress={navigateToAdminLogin}>
            <Image source={require('../../assets/icons/admin.png')} style={styles.adminIcon} />
          </TouchableOpacity>
        </View>
      </View>
      
      <Swiper 
        style={styles.swiperContainer} 
        showsButtons={false}
        removeClippedSubviews={false}
        autoplay loop 
        autoplayTimeout={5}
      >
        {products.map((product) => (
          <FlipCard
            style={[styles.flipCard,
              {
                flex: 0.9,
                width: '90%',
                height: 200,
                alignItems: 'center',
                alignSelf: 'center',
                justifyContent: 'center',
                backgroundColor: 'white',
                borderRadius: 20,
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
              }
            ]}
            friction={100}
            perspective={1000}
            flipHorizontal={true}
            flipVertical={false}
            flip={false}
            clickable={true}
            key={product.id}
          >
            {/* Face side */}
            <View style={styles.face}>
              <Image 
                source={{ uri: product.image }}
                style={[styles.productImage, {marginTop: 20}]} 
              />
              <View style={[styles.productInfo, {width: '100%'}]}>
                <View style={[styles.productNameContainer, {flexDirection: 'row', alignItems: 'center'}]}>
                  <Image 
                    source={require('../../assets/icons/star.png')} 
                    style={[styles.star, {width: 30, height: 30, margin: 5, transform: [{ translateY: 4}]}]}
                  />
                  <Text style={[styles.productName, {fontFamily: 'GmarketSansTTFBold'}]}>
                    추천 상품 : {product.name}
                  </Text>
                </View>
              <Text style={[styles.productPrice, {fontFamily: 'GmarketSansTTFMedium', marginTop: 15}]}>{formatPrice(product.price)}</Text>
            </View>
          </View>
          {/* Back side */}
          <View style={styles.back}>
              <Text style={[styles.productDetailTitle, {fontSize: 45, marginBottom: 30}]}>상품 상세 정보:</Text>
              <Text style={[styles.productDetailDescription, {fontSize: 35, lineHeight: 50}]}>{product.description}</Text>
            </View>
          </FlipCard>
        ))}
      </Swiper>
      
      
    
      <TouchableOpacity style={[styles.callButton, {backgroundColor: "#00664F"}]} onPress={makePhoneCall}>
        <Text style={[styles.callButtonText, {fontFamily: 'GmarketSansTTFBold'}]}>가게 전화 걸기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  appName: {
    textAlign: 'center',
    padding: 10,
  },
  swiperContainer: {
    height: 300,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
    borderRadius: 20
  },
  productInfo: {
    padding: 10,
    alignItems: 'center',
  },
  productName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 28,
    color: '#000',
    marginTop: 5,
  },
  callButton: {
    backgroundColor: '#007AFF',
    padding: 25,
    borderRadius: 15,
    margin: 20,
  },
  callButtonText: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  adminIconContainer: {
    position: 'absolute',
    right: 0,
  },
  adminIcon: {
    width: 28,
    height: 28,
  },
  back: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
  },
  productDetailTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    fontFamily: 'GmarketSansTTFBold',
  },
  productDetailDescription: {
    fontFamily: 'GmarketSansTTFMedium',
  },
});

export default HomeScreen;