import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CustomHeader({
  title,
  leftIconName,
  onLeftPress,
  rightIconName,
  onRightPress,
  titleStyle
}) {
  return (
    <View style={styles.container}>
      {/* Vasak ikoon */}
      {leftIconName && (
        <TouchableOpacity onPress={onLeftPress} style={styles.iconButton}>
          <Ionicons name={leftIconName} size={24} color="black" />
        </TouchableOpacity>
      )}

      {/* Pealkiri */}
      <Text style={[styles.title, titleStyle]}>{title}</Text>

      {/* Parem ikoon */}
      {rightIconName && (
        <TouchableOpacity onPress={onRightPress} style={styles.iconButton}>
          <Ionicons name={rightIconName} size={24} color="black" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1, // Võtab ülejäänud ruumi
    textAlign: 'left',
    marginLeft: 10,
  },
  iconButton: {
    padding: 6,
  },
});
