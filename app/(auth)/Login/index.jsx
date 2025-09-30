// Login.jsx
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    console.log('Email:', email);
    console.log('Password:', password);
    router.push('/(tabs)/index'); // Hiljem siia Firebase auth
  };

  const handleGmailLogin = () => {
    alert("Google login pole veel seadistatud Expo jaoks!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="john.doe@example.com"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          secureTextEntry={!showPassword}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.showHideText}>{showPassword ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={styles.orSignUpWithText}>Or sign up with</Text>
        <TouchableOpacity style={styles.GmailSignInButton} onPress={handleGmailLogin}>
          <AntDesign name="google" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={() => router.push('/(auth)/Signup')}>
        <Text style={styles.signUpText}>Don't have an account? Sign Up</Text>
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
 label: {
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
 showHideText: {
  color: '#5C6BC0',
  fontWeight: 'bold',
  marginHorizontal: 10,
 },
 loginButton: {
  width: '100%',
  height: 60,
  borderRadius: 8,
  backgroundColor: '#5C6BC0',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 20,
 },
 loginButtonText: {
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
 signUpText: {
  textAlign: 'center',
  marginTop: 15,
  color: 'blue',
 },
});
