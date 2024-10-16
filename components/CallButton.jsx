import React from 'react'
import { View, Text, TouchableOpacity, Linking } from 'react-native'
import { styled } from 'nativewind'

const StyledView = styled(View)
const StyledText = styled(Text)
const StyledTouchableOpacity= styled(TouchableOpacity)

const CallButton = () => {
  const makePhoneCall = () => {
    Linking.openURL('tel:010-4040-1669');
  };
  return (
    <StyledView className="absolute bottom-[10%] h-[12vh] w-full flex items-center justify-center">
      <StyledTouchableOpacity className="bg-[#847958] rounded-md h-2/3 w-4/5 flex justify-center items-center" onPress={makePhoneCall}>
        <StyledText className="text-white text-3xl font-pretendard">매장 주문</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  )
}

export default CallButton

