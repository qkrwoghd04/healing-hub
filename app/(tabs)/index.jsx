import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet, SafeAreaView } from 'react-native';
import Swiper from 'react-native-swiper';
import { useRouter } from 'expo-router';
import { useProducts } from '../contexts/ProductContext';
import FlipCard from 'react-native-flip-card';

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
            style={[styles.appNameImage, { width: 60, height: 60 }]}
          />
          <Text style={[styles.title, { padding: 10, fontFamily: 'Typography-Times-Regular', fontSize: 38, color:"#443F3D" }]}>Healing Hub</Text>
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
              marginTop: 5,
              alignItems: 'center',
              alignSelf: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.5,
              shadowRadius: 3.84,
              elevation: 3,
            }
            ]}
            friction={1000}
            perspective={3000}
            flipHorizontal={true}
            flipVertical={false}
            flip={false}
            clickable={true}
            key={product.id}
          >
            {/* Face side */}
            <View style={styles.face}>
              <View style={[styles.ImageContainer, { justifyContent: "center", alignContent: "center" }]}>
                <Image
                  source={{ uri: product.image }}
                  style={[styles.productImage, { width: 350, height: 350, marginTop: 10 }]}
                />
              </View>
              <View style={[styles.line, { flex: 17, borderBottomWidth: 1, width: "100%", borderBlockColor: "#e9ede6", marginTop: 10 }]} />
              <View style={[styles.productInfo, { width: '100%' }]}>
                <View style={[styles.productNameContainer, { flexDirection: 'row', alignItems: 'center' }]}>
                  <Text
                    style={[styles.productName, { fontFamily: 'Pretendard-Medium' }]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {product.name.length > 15 ? product.name.substring(0, 17) + "..." : product.name}
                  </Text>
                </View>
                <Text style={[styles.productPrice, { fontFamily: 'Pretendard-Medium', marginTop: 10, marginBottom: 10 }]}>{formatPrice(product.price)}</Text>
              </View>
            </View>
            {/* Back side */}
            <View style={styles.back}>
              <Text style={[styles.productDetailTitle, { fontSize: 30, marginBottom: 10 }]}>{product.name} :</Text>
              <Text style={[styles.productDetailDescription, { fontSize: 27, lineHeight: 50 }]}>({product.description})</Text>
            </View>
          </FlipCard>
        ))}
      </Swiper>



      <TouchableOpacity style={[styles.callButton, { backgroundColor: "#847958", borderRadius: 10 }]} onPress={makePhoneCall}>
        <Text style={[styles.callButtonText, { fontFamily: 'Pretendard-Medium' }]}>가게 전화 걸기</Text>
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
  adminIconContainer: {
    position: 'absolute',
    right: 0,
  },
  adminIcon: {
    width: 28,
    height: 28,
    marginRight: 5
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
    resizeMode: 'stretch',
    borderRadius: 20
  },
  productInfo: {
    padding: 10,
    alignItems: 'center',
  },
  productName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 5,
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
  back: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
  },
  productDetailTitle: {
    fontFamily: 'Pretendard-Medium',
  },
  productDetailDescription: {
    fontFamily: 'Pretendard-Light',
  },
});

export default HomeScreen;