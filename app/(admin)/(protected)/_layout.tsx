import { Drawer } from 'expo-router/drawer'

const DrawerLayout = () => {
  return (
    <Drawer>
      <Drawer.Screen
        name="home"
        options={{
          drawerLabel: 'Home',
          title: '관리자모드',
        }}
      />
      <Drawer.Screen
        name="manage"
        options={{
          drawerLabel: 'Manage',
          title: '상품 관리',
        }}
      />
    </Drawer>
  )
}

export default DrawerLayout
