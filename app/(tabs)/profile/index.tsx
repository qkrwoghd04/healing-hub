import React, { memo } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { colors } from '@/utils/colors';

const shopInfoData = [
  {
    id: 1,
    title: "매장 소개",
    content: "힐링허브는 회원님의 환하게 웃는 모습을 기대하며 최고의 제품을 최저가로 공급합니다"
  },
  {
    id: 2,
    title: "전화번호",
    content: "010-4040-1669"
  },
  {
    id: 3,
    title: "영업시간",
    content: (
      <>
        평일 9:30 - 17:00 {'\n'}<Text style={{ color: 'red' }}>일요일만 휴무</Text>
      </>
    )
  },
  {
    id: 4,
    title: "오시는법",
    content: (
      <>
        - 1호선 동대문역 8번출구, 종로 5가역 6번출구
        - 2호선, 3호선, 5호선, 4호선동대문역사문화공원역 14번 출구 {'\n'}<Text style={{ color: 'red' }}>평화시장방면 2층 169호</Text>
      </>
    )
  },
];

const Profile = () => {
  return (
    <SafeAreaView style={styles.profileContainer}>
      {/* Shop Image */}
      <View style={styles.shopImageContainer}>
        <Image source="shop" style={styles.shopImage} />
      </View>
      {/* Shop Info */}
      <View style={styles.shopInfoContainer}>

        {shopInfoData.map((shopInfo) => {
          return (
            <View key={shopInfo.id} style={styles.shopInfoBox}>
              <Text style={styles.shopInfotitle}>{shopInfo.title}</Text>
              <Text style={styles.shopInfoContent}>
                {shopInfo.content}
              </Text>
            </View>
          )
        })}

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fff"
  },
  shopImageContainer: {
    height: "35%",
    width: "auto",
    paddingHorizontal: 8
  },
  shopImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10
  },
  shopInfoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  shopInfoBox: {
    width: "100%",
    marginBottom: 8,
    borderColor: colors.gray,
    borderBottomWidth: 2,
  },
  shopInfotitle: {
    fontSize: 24,
    lineHeight: 32
  },
  shopInfoContent: {
    fontSize: 18,
    lineHeight: 28
  }
})

export default memo(Profile);
