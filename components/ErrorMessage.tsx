import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ErrorMessageProps {
  error?: Error | null;
  onRetry?: () => void;
  message?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  error, 
  onRetry,
  message = '문제가 발생했습니다.'
}) => {
  const errorMessage = error?.message || message;

  return (
    <View style={styles.errorContainer}>
      <MaterialIcons name="error-outline" size={48} color="#FF4444" />
      <Text style={styles.errorText}>{errorMessage}</Text>
      {onRetry && (
        <TouchableOpacity 
          style={styles.retryButton} 
          onPress={onRetry}
        >
          <Text style={styles.retryText}>다시 시도</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20
  },
  errorText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginVertical: 15
  },
  retryButton: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10
  },
  retryText: {
    color: 'white',
    fontSize: 16
  }
});

// types/error.ts
export interface ApiError extends Error {
  response?: {
    status: number;
    data: any;
  };
  code?: string;
}