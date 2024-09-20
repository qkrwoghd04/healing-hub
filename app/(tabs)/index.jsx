import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet, SafeAreaView} from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useRouter } from 'expo-router';
import { useProducts } from '../contexts/ProductContext';
import FlipCard from 'react-native-flip-card';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.callButton} onPress={makePhoneCall}>
          <Text style={styles.callButtonText}>가게 전화 걸기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const HeaderContent = memo(({ navigateToAdminLogin }) => (
  <View style={styles.headerContent}>
    <Image
      source={require('../../assets/images/logo.png')}
      style={styles.appNameImage}
    />
    <Text style={styles.title}>
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
    padding: wp('2%'),
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  appNameImage: {
    width: wp('15%'),
    height: wp('15%'),
    maxWidth: 60,
    maxHeight: 60,
  },
  title: {
    padding: wp('2%'),
    fontFamily: 'Typography-Times-Regular',
    fontSize: wp('9%'),
    color: "#443F3D",
  },
  adminIconContainer: {
    position: 'absolute',
    right: 0,
  },
  adminIcon: {
    width: wp('7%'),
    height: wp('7%'),
    maxWidth: 28,
    maxHeight: 28,
    marginRight: wp('2%'),
  },
  swiperContainer: {
    height: hp('60%'),
    marginTop: 7
  },
  slide: {
    width: wp('100%'),
    height: hp('55%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  flipCard: {
    width: wp('90%'),
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
  ImageContainer: {
    justifyContent: "center",
    alignContent: "center",
    width: '100%',
    height: '75%',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  line: {
    borderBottomWidth: 1,
    width: "100%",
    borderBlockColor: "#e9ede6",
    marginTop: hp('1%'),
  },
  productNameContainer: {
    flexDirection: 'row',
    justifyContent: 'center',   
    width: '100%',             
  },
  productInfo: {
    flex: 0.8,
    padding: wp('2%'),
    alignItems: 'center',
    width: '100%',
  },
  productName: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    marginTop: hp('1%'),
    fontFamily: 'Pretendard-Medium',
    textAlign: 'center', 
    width: '90%', 
  },
  productPrice: {
    fontSize: wp('7%'),
    color: '#000',
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    fontFamily: 'Pretendard-Medium'
  },
  buttonContainer: {
    height: hp('12%'),

    alignContent: 'center',
    justifyContent: 'center'
  },
  callButton: {
    backgroundColor: '#847958',
    padding: wp('5%'),
    borderRadius: 10,
    marginHorizontal: wp('5%'),
  },
  callButtonText: {
    color: 'white',
    fontSize: wp('9%'),
    textAlign: 'center',
    fontFamily: 'Pretendard-Medium'
  },
  back: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: wp('4%'),
  },
  productDetailTitle: {
    fontFamily: 'Pretendard-Medium',
    fontSize: wp('7%'),
    marginBottom: hp('1%'),
  },
  productDetailDescription: {
    fontFamily: 'Pretendard-Light',
    fontSize: wp('6%'),
    lineHeight: hp('6%'),
  },
  paginationDot: {
    width: wp('3%'),
    height: wp('2%'),
    borderRadius: wp('1%'),
    marginHorizontal: wp('1%'),
  },
  ImageContainer: {
    justifyContent: "center",
    alignContent: "center",
    width: '100%',
    height: '75%',
  },
  line: {
    borderBottomWidth: 1,
    width: "100%",
    borderBlockColor: "#e9ede6",
    marginTop: hp('1%'),
  },

});

export default HomeScreen;