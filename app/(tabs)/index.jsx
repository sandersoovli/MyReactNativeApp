// path: app/(tabs)/index.jsx või HomeScreen.jsx
import CustomButton from '@/components/ui/CustomButton';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter(); // router navigeerimiseks

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/opening_image.png')}
        style={styles.Image}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>You will find</Text>
        <Text style={[styles.titleText, styles.innerTitle]}>All you need</Text>
        <Text style={styles.titleText}>Here!</Text>
      </View>

      <View style={styles.buttonsContainer}>
        {/* Sign Up */}
        <CustomButton
          buttonProps={{
            title: 'Sign up',
            color: '#4F63AC',
            textColor: '#fff',
            onPress: () => router.push('/Signup'), // navigeerib Signup ekraanile
          }}
          style={{ marginBottom: 10 }}
        />

        {/* Log In */}
        <CustomButton
          buttonProps={{
            title: 'Log in',
            color: '#fff',
            textColor: '#4F63AC',
            onPress: () => router.push('/Login'), // navigeerib Login ekraanile
          }}
          style={{ marginTop: 10 }}
        />
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
    width: '100%',          
    height: 200,         
    marginBottom: 30,    
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titleText: {
    fontSize: 32, 
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  innerTitle: {
    color: '#FFA500',
    fontSize: 32,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  buttonsContainer: {
    alignItems: 'center',
    width: '100%',
  },
});
