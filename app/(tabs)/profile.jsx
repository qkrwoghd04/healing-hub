import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, Linking, TouchableOpacity } from 'react-native';

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
            value="서울특별시 중구 청계천로 246 평화시장 2층 나 169호 (우 : 04563)"
            isAddress={true}
          />
          <View style={styles.separator} />
          <InfoItem 
            label="전화번호" 
            value="010-4040-1669"
            isPhoneNumber={true}
          />
          <View style={styles.separator} />
          <InfoItem label="영업시간" value="평일 9:00 - 18:00, 주말 휴무" />
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
    width: '90%',
    height: 340,
    resizeMode: 'cover',
    borderRadius: 20,
  },
  infoContainer: {
    padding: 20,
  },
  infoItem: {
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 28,
    
  },
  value: {
    fontSize: 20,
  },
  separator: {
    height: 1, // 구분선의 두께
    backgroundColor: '#ccc', // 흐린 회색 구분선
    opacity: 0.5, // 구분선의 투명도 설정
    width: '100%',
  },
});

export default Profile;