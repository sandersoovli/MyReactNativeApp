// path: components/ui/CustomButton.jsx
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export default function CustomButton({ buttonProps }) {
  const { title, onPress, color = '#007BFF', textColor = '#fff' } = buttonProps;

  return (
    <Pressable
      onPress={onPress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: color, opacity: pressed ? 0.7 : 1 },
      ]}
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
