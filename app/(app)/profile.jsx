import React from 'react';
import { View, Text, Image, ScrollView, SafeAreaView } from 'react-native';



const Profile = () => {
  return (
    <SafeAreaView className="w-full h-full flex flex-col justify-start items-center relative">
      {/* Shop Image */}
      <View className="w-[90%] h-[40%]">
        <Image
          source={require('../../assets/images/shop.jpg')}
          className="w-full h-full bg-cover rounded-md"
        />
      </View>
      {/* Shop Info */}
      <ScrollView>
        <View className="w-full h-[60%] mt-4 px-4">
          <View className="w-full mb-2">
            <Text className="text-3xl font-Pretendard-Medium mb-1">매장 소개</Text>
            <Text className="text-xl font-Pretendard-Medium">힐링허브는 회원님의 환하게 웃는 모습을 기대하며 최고의 제품을 최저가로 공급합니다</Text>
            <View className="w-full bg-gray-400 border-[0.3px]"></View>
          </View>
          <View className="w-full mb-2">
            <Text className="text-3xl font-Pretendard-Medium mb-1">전화번호</Text>
            <Text className="text-xl font-Pretendard-Medium">010-4040-1669</Text>
            <View className="w-full bg-gray-400 border-[0.3px]"></View>
          </View>
          <View className="w-full mb-2">
            <Text className="text-3xl font-Pretendard-Medium mb-1">영업시간</Text>
            <Text className="text-xl font-Pretendard-Medium">평일 9:30 - 17:00</Text>
            <Text className="text-red-600 text-xl font-Pretendard-Medium">일요일만 휴무</Text>
            <View className="w-full bg-gray-400 border-[0.3px]"></View>
          </View>
          <View className="w-full">
            <Text className="text-3xl font-Pretendard-Medium mb-1">오시는법</Text>
            <Text className="text-xl font-Pretendard-Medium">1호선 동대문역 8번출구, 종로 5가역 6번출구, {"\n"}2호선, 3호선, 5호선, 4호선 동대문역사문화공원역 14번 출구</Text>
            <Text className="text-xl font-Pretendard-Medium text-red-600">평화시장방면 2층 169호</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
