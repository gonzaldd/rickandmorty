import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{message}</Text>
    {onRetry && (
      <View style={styles.buttonContainer}>
        <Button title='retry' onPress={onRetry} />
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  text: { color: 'red', fontSize: 16, textAlign: 'center' },
  buttonContainer: {
    marginTop: 20,
  },
});

export default ErrorMessage;