import React, { ReactNode } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter, Href } from 'expo-router';

interface HearderProps {
  title: string;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
  rightRoute?: Href;
  leftRoute?: Href;
}

const Header: React.FC<HearderProps> = ({
  title,
  iconRight,
  iconLeft,
  rightRoute,
  leftRoute
}) => {
  const router = useRouter();

  const handleNavigation = (route?: Href) => {
    if (route) {
      router.push(route);
    }
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.iconContainer}>
        <Pressable onPress={() => handleNavigation(leftRoute)}>
          {iconLeft}
        </Pressable>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title} numberOfLines={1}>{title}</Text>
      </View>

      <View style={styles.iconContainer}>
        <Pressable onPress={() => handleNavigation(rightRoute)}>
          {iconRight}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "relative",
    width: "100%",
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 8,
    paddingHorizontal: 20
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    lineHeight: 36,
  }
})

export default Header;