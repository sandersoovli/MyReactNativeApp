import CustomButton from '@/components/ui/CustomButton';
import { useRouter } from 'expo-router';
import { Image, StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
     <Image
        source={require('@/assets/images/opening_image.png')}
        style={styles.Image}
      />
      <Text style={styles.title}>Welcome!</Text>
      <CustomButton
        buttonProps={{
          title: 'Sign Up',
          onPress: () => router.replace('/(auth)/Signup'),
        }}
      />
      <CustomButton
        buttonProps={{
          title: 'Log In',
          onPress: () => router.replace('/(auth)/Login'),
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  Image: { width: 200, height: 200, marginBottom: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
});
