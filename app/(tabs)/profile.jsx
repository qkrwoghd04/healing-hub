import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

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
          <InfoItem label="주소" value="서울 중구 청계천로274 평화시장 2층나열169호 힐링허브" />
          <InfoItem label="전화번호" value="010-4040-1669" />
          <InfoItem label="영업시간" value="평일 9:00 - 18:00, 주말 휴무" />
          <InfoItem label="소개" value="최고 품질의 건강식품만을 판매하는 전문점입니다. 고객 여러분의 건강을 지켜드리겠습니다." />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoItem = ({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={[styles.label, {fontFamily: 'Pretendard-Bold'}]}>{label}:</Text>
    <Text style={[styles.value, {fontFamily: 'Pretendard-SemiBold'}]}>{value}</Text>
  </View>
);

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
});

export default Profile;