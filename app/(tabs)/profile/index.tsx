import React, { memo } from 'react';
import { View, Text, ScrollView, SafeAreaView } from 'react-native';
import { Image } from 'expo-image';

const Profile = () => {
  console.log('[Profile] Rendered');

  return (
    <SafeAreaView className="w-full h-full flex flex-col justify-start items-center relative bg-white">
      <View className="w-full h-full flex flex-col justify-center items-center mt-10">
        {/* Shop Image */}
        <View className="w-full h-[35%] relative px-2">
          <Image source="shop" style={{ width: '100%', height: '100%', borderRadius: 10 }} />
        </View>
        {/* Shop Info */}
        <View className="flex justify-center items-center w-full h-[70%] relative">
          <ScrollView className="w-full h-full">
            <View className="mt-4 px-4">
              <View className="w-full mb-2 border-b-[1px] border-gray-300">
                <Text className="text-2xl font-SpoqaBold mb-1">매장 소개</Text>
                <Text className="text-lg font-SpoqaMedium">
                  힐링허브는 회원님의 환하게 웃는 모습을 기대하며 최고의 제품을 최저가로 공급합니다
                </Text>
              </View>
              <View className="w-full mb-2 border-b-[1px] border-gray-300">
                <Text className="text-2xl font-SpoqaBold mb-1">전화번호</Text>
                <Text className="text-lg font-SpoqaMedium">010-4040-1669</Text>
              </View>
              <View className="w-full mb-2 border-b-[1px] border-gray-300">
                <Text className="text-2xl font-SpoqaBold mb-1">영업시간</Text>
                <Text className="text-lg font-SpoqaMedium">평일 9:30 - 17:00</Text>
                <Text className="text-red text-xl font-SpoqaMedium">일요일만 휴무</Text>
              </View>
              <View className="w-full border-b-[1px] border-gray-300">
                <Text className="text-2xl font-SpoqaBold mb-1">오시는법</Text>
                <Text className="text-lg font-SpoqaMedium">
                  - 1호선 동대문역 8번출구, 종로 5가역 6번출구 {'\n'}- 2호선, 3호선, 5호선, 4호선
                  동대문역사문화공원역 14번 출구
                </Text>
                <Text className="text-xl font-SpoqaMedium text-red">
                  평화시장방면 2층 169호
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default memo(Profile);
