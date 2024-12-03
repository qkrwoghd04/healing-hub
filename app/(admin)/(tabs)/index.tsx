import React, { useState } from 'react';
import { Text, View, SafeAreaView, Pressable } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';

// Components
import Header from '../../../components/Header';
import AddProductModal from '../../../components/modals/AdminProductModal';
import { FlatGrid } from 'react-native-super-grid';

type AdminMenuItem = {
  name: string;
  code: string;
  route: '/mngProduct' | '/mngPost' | '/sendNotification';
};
const items: AdminMenuItem[] = [
  { name: '상품 관리', code: '#1abc9c', route: '/mngProduct' },
  { name: '글 관리', code: '#3498db', route: '/mngPost' },
  { name: '알림 보내기', code: '#9b59b6', route: '/sendNotification' },
];

const AdminHome = () => {
  console.log('[Admin Home] Rendered');
  const [modalVisible, setModalVisible] = useState(false);

  function pressCatagory(item: AdminMenuItem) {
    router.push(item.route);
  }

  return (
    <SafeAreaView className="w-full h-full bg-white">
      {/* Header */}
      <Header
        name="Admin Home"
        iconRight={<Feather name="home" size={30} color="black" />}
        rightRoute="/(user)/(tabs)"
      />
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
      {/* Add Button */}
      <Pressable
        className="absolute bottom-3 right-5 bg-[#20284F] p-2 rounded-lg"
        onPress={() => setModalVisible(true)}>
        <Text className="text-xl text-white font-pretendard-light">상품 추가</Text>
      </Pressable>

      {/* Product Modal */}
      <AddProductModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </SafeAreaView>
  );
};

export default AdminHome;
