import React, { useState } from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native'

interface CustomTextInputProps extends TextInputProps {
  focusedBorderColor? : string;
  defaultBorderColor? : string;
  containerStyle? : any;
}

const CustomTextInput : React.FC<CustomTextInputProps> = ({
  focusedBorderColor = '#4C80F1', 
  defaultBorderColor='#D3D3D3',
  containerStyle,
  onFocus,
  onBlur,
  ...rest
  
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    if(onFocus) onFocus(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  }

  return (
    <TextInput
      {...rest}
      style={[
        styles.input,
        containerStyle,
        { 
          borderColor: isFocused ? focusedBorderColor : defaultBorderColor,
          borderWidth: 1
        }
      ]}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 60,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 12,
  }
});

export default CustomTextInput;