import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, Linking, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={[styles.imageContainer, {width: '100%', alignItems: 'center'}]}>
          <Image
            source={require('../../assets/images/shop.jpg')}
            style={styles.storeImage}
          />
        </View>
        <View style={styles.infoContainer}>
          <InfoItem label="가게 이름" value="힐링 허브" />
          <View style={styles.separator} />
          <InfoItem 
            label="주소" 
            value="서울특별시 중구 청계천로 246 평화시장 2층 나 169호"
          />
          <View style={styles.separator} />
          <InfoItem 
            label="전화번호" 
            value="010-4040-1669"
          />
          <View style={styles.separator} />
          <InfoItem label="영업시간" value="평일 9:30 - 18:00, 일요일만 휴무" />
          <View style={styles.separator} />
          <InfoItem label="소개" value="최고 품질의 건강식품만을 판매하는 전문점입니다. 고객 여러분의 건강을 지켜드리겠습니다." />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoItem = ({ label, value, isAddress = false, isPhoneNumber = false }) => {
  const handlePress = () => {
    if (isAddress) {
      const url = `https://map.naver.com/p/search/${encodeURIComponent(value)}`;
      Linking.openURL(url);
    } else if (isPhoneNumber) {
      Linking.openURL(`tel:${value}`);
    }
  };

  return (
    <View style={styles.infoItem}>
      <Text style={[styles.label, {fontFamily: 'Pretendard-Medium'}]}>{label}:</Text>
      {isAddress || isPhoneNumber ? (
        <TouchableOpacity onPress={handlePress}>
          <Text style={[
            styles.value, 
            {
              fontFamily: 'Pretendard-Light',
              color: isAddress || isPhoneNumber ? '#0000FF' : '#000',
              textDecorationLine: isAddress || isPhoneNumber ? 'underline' : 'none'
            }
          ]}>
            {value}
          </Text>
        </TouchableOpacity>
      ) : (
        <Text style={[styles.value, {fontFamily: 'Pretendard-Light'}]}>{value}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  storeImage: {
    width: wp('90%'), // 화면 크기에 맞춰 유연하게 조정
    height: hp('30%'), // 화면 높이에 따라 유연하게 조정
    resizeMode: 'cover',
    borderRadius: 20,
    marginTop: 40
  },
  infoContainer: {
    padding: wp('4%'), // 화면 크기에 맞게 padding 조정
  },
  infoItem: {
    marginBottom: hp('1%'), // 항목 사이 간격을 높이에 따라 유연하게 설정
  },
  label: {
    fontWeight: 'bold',
    fontSize: wp('6%'), // 화면 크기에 맞게 폰트 크기 조정
  },
  value: {
    fontSize: wp('4.5%'), // 화면 크기에 맞게 폰트 크기 조정
  },
  separator: {
    height: 1, 
    backgroundColor: '#ccc', 
    opacity: 0.5, 
    width: '100%',
  },
});

export default Profile;
