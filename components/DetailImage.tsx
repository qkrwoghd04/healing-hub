import { useState } from 'react';
import { View } from 'react-native';
import { Image } from 'expo-image';

const DetailImage = ({ uri }: { uri: string }) => {
  const [imgHeight, setImgHeight] = useState(0);

  return (
    <View className="w-full" style={{ height: imgHeight }}>
      <Image
        source={{ uri: uri }}
        contentFit="fill"
        style={{
          width: '100%',
          height: '100%',
          borderWidth: 1,
          borderColor: '#e8e8e8',
        }}
        placeholder={require('@/assets/images/loading.png')}
        placeholderContentFit='cover'
        transition={300}
        priority="normal"
        onLoad={(event) => {
          const { height } = event.source;
          setImgHeight(height - (height / 10) * 3);
        }}
        cachePolicy="memory-disk"
      />
    </View>
  );
};

export default DetailImage;
