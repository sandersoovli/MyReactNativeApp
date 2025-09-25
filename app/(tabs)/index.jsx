import { Image, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/opening_image.png')}
        style={styles.Image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>You will find</Text>
        <Text style={[styles.title, styles.innerTitle]}>All you need</Text>
        <Text style={styles.titleText}>Here!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  Image: {
    width: '100%',          // prototüübi järgi
    height: 200,         // prototüübi järgi
    marginBottom: 30,    // vahe pildi ja tekstide vahel
    opacity: 1,          // prototüübist 
  },
  textContainer: {
    alignItems: 'center', // center text horizontally
  },
  titleText: {
    fontSize: 32, 
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10, // spacing between lines
    color: '#000',
  },
  innerTitle: {
    color: '#FFA500',
    fontSize: 32,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});
