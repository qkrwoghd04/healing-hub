import React from 'react';
import { TextInput , View } from 'react-native';
import { Feather } from '@expo/vector-icons';



interface SearchBarProps {
  searchQuery: string;
  onSearch: (query: string) => void; // 함수 타입 정의
  style?: React.ComponentProps<typeof View>['style']; // style 타입 정의
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearch, style }) => {
  return (
    <View>
      <View className="flex-row" style={style}>
        <Feather name="search" size={24} color="gray" className="ml-5" />
        <TextInput
          placeholder="검색"
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          value={searchQuery}
          onChangeText={onSearch}
          className="flex-1 ml-3"
        />
      </View>
    </View>
  );
};

export default SearchBar;
