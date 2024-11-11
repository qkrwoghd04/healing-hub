import React from 'react';
import { TextInput as NativeTextInput, View as NativeView } from 'react-native';
import { styled } from 'nativewind';
import { Feather } from '@expo/vector-icons';

const View = styled(NativeView);
const TextInput = styled(NativeTextInput);

const SearchBar = ({ searchQuery, onSearch, style }) => {
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
