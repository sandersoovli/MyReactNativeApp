// Signup.jsx
import { auth } from '@/app/(context)/AuthContext';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async () => {
    // Kontrollime, kas kõik väljad on täidetud ja linnuke on märgitud
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (!agreed) {
      Alert.alert('Error', 'Please agree to the Terms & Privacy.');
      return;
    }

    try {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: name });
  router.replace('/(tabs)/'); // Navigeerib pealehele
} catch (err) {
  let message = '';
  switch (err.code) {
    case 'auth/invalid-email':
      message = 'Please enter the correct e-mail address.';
      break;
    case 'auth/email-already-in-use':
      message = 'This e-mail is already registered.';
      break;
    case 'auth/weak-password':
      message = 'Password must be at least 6 characters.';
      break;
    default:
      message = 'Sign Up failed. Please try again.';
  }
  Alert.alert('Error', message);
}

  };

  const handleGmailLogin = () => {
    Alert.alert('Google login pole veel seadistatud Expo jaoks!');
  };

  const openTerms = () => {
    router.push('/terms-privacy');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="John Doe"
        value={name}
        onChangeText={setName}
      />

      <Text style={styles.title}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="john.doe@example.com"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.title}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={{ padding: 15 }}>{showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setAgreed(!agreed)}
      >
        <Text style={styles.checkboxText}>
          {agreed ? '☑' : '☐'} I agree with{' '}
          <Text style={{ color: 'blue' }} onPress={openTerms}>
            Terms & Privacy
          </Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.signupButton, { backgroundColor: name && email && password && agreed ? '#4F63AC' : '#ccc' }]}
        onPress={handleSignup}
      >
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={styles.orSignUpWithText}>Or sign up with</Text>
        <TouchableOpacity style={styles.GmailSignInButton} onPress={handleGmailLogin}>
          <AntDesign name="google" size={24} color="white" style={styles.googleIcon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push('/(auth)/Login')}>
        <Text style={styles.footerText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 20,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 20,
    width: '100%',
    height: 24,
  },
  checkboxText: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    opacity: 1,
    marginLeft: 8,
  },
  signupButton: {
    width: '100%',
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  orSignUpWithText: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  GmailSignInButton: {
    width: 200,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#233a5fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIcon: {
    color: 'white',
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 15,
    color: 'blue',
  },
});
