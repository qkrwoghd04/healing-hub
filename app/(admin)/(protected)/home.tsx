import React from 'react';
import { Text, View, SafeAreaView, Pressable } from 'react-native';
import { router } from 'expo-router';

// Components
import { FlatGrid } from 'react-native-super-grid';

type AdminMenuItem = {
  name: string;
  code: string;
  route: '/sendNotification' | '/manageProductModal';
};
const items: AdminMenuItem[] = [
  { name: '알림 보내기', code: '#9b59b6', route: '/sendNotification' },
  { name: '상품 추가', code: '#1abc9c', route: '/manageProductModal' },
];

const AdminHome = () => {
  console.log('[Admin Home] Rendered');

  function pressCatagory(item: AdminMenuItem) {
    router.push(item.route);
  }

  return (
    <SafeAreaView className="w-full h-full bg-white">

      <FlatGrid
        itemDimension={130}
        data={items}
        style={[{ paddingTop: 10 }, { paddingBottom: 10 }, { flex: 1 }]}
        spacing={10}
        renderItem={({ item }) => (
          <Pressable onPress={() => pressCatagory(item)}>
            <View
              className="items-center justify-center rounded-xl p-4 h-[100px]"
              style={{ backgroundColor: item.code }}>
              <Text className="font-Pretendard-Medium text-2xl text-white">{item.name}</Text>
            </View>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default AdminHome;
