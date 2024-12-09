import { useState } from 'react'
import { View } from 'react-native';
import { Image } from 'expo-image';

const DetailImage = (({uri}: {uri : string}) => {
  const [imgHeight, setImgHeight] = useState(0);

  return (
    <View className="w-full" style={{ height: imgHeight ? imgHeight : 'auto' }}>
      <Image
        source={{ uri: uri }}
        contentFit="fill"
        style={{
          width:"100%", 
          height: "100%",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#000000',
        }}
        transition={300}
        priority="normal"
        onLoad={(event) => { const { height } = event.source; setImgHeight(height)}}
        cachePolicy="memory-disk"
      />
    </View>
  )
})

export default DetailImage;