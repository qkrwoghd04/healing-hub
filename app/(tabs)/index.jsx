import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useRouter } from 'expo-router';
import { useProducts } from '../contexts/ProductContext';
import FlipCard from 'react-native-flip-card';

const { width } = Dimensions.get('window');

// HomeScreen Component (No need to memoize as it's the parent)
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
        <HeaderContent navigateToAdminLogin={navigateToAdminLogin} />
      </View>

      <View style={styles.swiperContainer}>
        <SwiperFlatList
          autoplay
          autoplayLoop
          autoplayDelay={3}
          index={0}
          showPagination
          paginationStyleItem={styles.paginationDot}
          paginationDefaultColor="#ACAAAB"
          paginationActiveColor="#443F3D"
          paginationStyle={styles.pagination}
          data={products}
          keyExtractor={(item) => item.id.toString()}
          windowSize={5} 
          renderItem={({ item }) => <ProductSlide item={item} formatPrice={formatPrice} />}
        />
      </View>

      <TouchableOpacity style={styles.callButton} onPress={makePhoneCall}>
        <Text style={styles.callButtonText}>가게 전화 걸기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const HeaderContent = memo(({ navigateToAdminLogin }) => (
  <View style={styles.headerContent}>
    <Image
      source={require('../../assets/images/logo.png')}
      style={[styles.appNameImage, { width: 60, height: 60 }]}
    />
    <Text style={[styles.title, { padding: 10, fontFamily: 'Typography-Times-Regular', fontSize: 38, color: "#443F3D" }]}>
      Healing Hub
    </Text>
    <TouchableOpacity style={styles.adminIconContainer} onPress={navigateToAdminLogin}>
      <Image source={require('../../assets/icons/admin.png')} style={styles.adminIcon} />
    </TouchableOpacity>
  </View>
));

const ProductSlide = memo(({ item, formatPrice }) => (
  <View style={styles.slide}>
    <FlipCard
      style={styles.flipCard}
      friction={1000}
      perspective={3000}
      flipHorizontal={true}
      flipVertical={false}
      flip={false}
      clickable={true}
    >
      {/* Face side */}
      <View style={styles.face}>
        <View style={styles.ImageContainer}>
          <Image source={{ uri: item.image }} style={styles.productImage} />
        </View>
        <View style={styles.line} />
        <View style={styles.productInfo}>
          <View style={styles.productNameContainer}>
            <Text
              style={styles.productName}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.name.length > 15 ? item.name.substring(0, 17) + "..." : item.name}
            </Text>
          </View>
          <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
        </View>
      </View>
      {/* Back side */}
      <View style={styles.back}>
        <Text style={styles.productDetailTitle}>{item.name} :</Text>
        <Text style={styles.productDetailDescription}>({item.description})</Text>
      </View>
    </FlipCard>
  </View>
));

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
    height: 550,  // Adjust this value as needed
  },
  slide: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipCard: {
    flex: 0.9,
    width: width * 0.9,
    height: 500,  // Adjust this value as needed
    marginTop: 5,
    alignItems: 'center',
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
  },
  productImage: {
    width: 373,
    height: 350,
    resizeMode: 'stretch',
    borderRadius: 10
  },
  productInfo: {
    padding: 10,
    alignItems: 'center',
    width: '100%',
  },
  productName: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 5,
    fontFamily: 'Pretendard-Medium'
  },
  productPrice: {
    fontSize: 28,
    color: '#000',
    marginTop: 10,
    marginBottom: 10,
    fontFamily: 'Pretendard-Medium'
  },
  callButton: {
    backgroundColor: '#847958',
    padding: 25,
    borderRadius: 10,
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 20
  },
  callButtonText: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Pretendard-Medium'
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
    fontSize: 30,
    marginBottom: 10
  },
  productDetailDescription: {
    fontFamily: 'Pretendard-Light',
    fontSize: 27,
    lineHeight: 50
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
  ImageContainer: { 
    justifyContent: "center", 
    alignContent: "center" 
  },
  line: { 
    flex: 17, 
    borderBottomWidth: 1, 
    width: "100%", 
    borderBlockColor: "#e9ede6", 
    marginTop: 10 
  },
  productNameContainer: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
});

export default HomeScreen;