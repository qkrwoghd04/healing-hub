import React from 'react';
import { TextInput, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <View className="flex-row justify-center items-center h-[50px] bg-white">
      <Feather name="search" size={24} color="gray" className="ml-5" />
      <TextInput
        placeholder="상품을 검색하세요"
        clearButtonMode="always"
        autoCapitalize="none"
        autoCorrect={false}
        value={searchQuery}
        onChangeText={setSearchQuery}
        className="flex-1 ml-3 border-none"
      />
    </View>
  );
};

export default SearchBar;