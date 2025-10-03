// (auth)/Signup/index.jsx
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Linking, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Kontrolli, kas kõik väljad on täidetud ja checkbox märgitud
  const isFormValid = name.trim() && email.trim() && password.trim() && agreed;

  const handleSignup = () => {
    if (!isFormValid) {
      Alert.alert('Error', 'Please fill all fields and agree to Terms & Privacy.');
      return;
    }

    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Agreed:', agreed);

    // Pärast edukat registreerimist liigu Tabs ekraanile
    router.push('/(tabs)'); 
  };

  const handleGmailLogin = () => {
    alert("Google login pole veel seadistatud Expo jaoks!");
  };

  const openTerms = () => Linking.openURL('https://yourwebsite.com/terms');
  const openPrivacy = () => Linking.openURL('https://yourwebsite.com/privacy');

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

      {/* Checkbox koos linkidega */}
      <TouchableOpacity
  style={styles.checkboxContainer}
  onPress={() => setAgreed(!agreed)}
>
  <Text style={styles.checkboxText}>
    {agreed ? '☑' : '☐'} I agree with{' '}
    <Text style={{color: 'blue'}} onPress={() => router.push('/terms-privacy')}>
      Terms
    </Text>{' '}
    &{' '}
    <Text style={{color: 'blue'}} onPress={() => router.push('/terms-privacy')}>
      Privacy
    </Text>
  </Text>
</TouchableOpacity>

      {/* Sign Up nupp */}
      <TouchableOpacity
        style={[styles.signupButton, { backgroundColor: isFormValid ? '#5C6BC0' : '#AAA' }]}
        disabled={!isFormValid}
        onPress={handleSignup}
      >
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Gmail login */}
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={styles.orSignUpWithText}>Or sign up with</Text>
        <TouchableOpacity style={styles.GmailSignInButton} onPress={handleGmailLogin}>
          <AntDesign name="google" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Footer */}
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
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  signupButton: {
    width: '100%',
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
    marginBottom: 20,
  },
  footerText: {
    textAlign: 'center',
    color: 'blue',
  },
});
