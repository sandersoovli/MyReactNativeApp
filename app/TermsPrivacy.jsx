// TermsPrivacy.jsx
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function TermsPrivacy() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Terms & Conditions</Text>
      <Text style={styles.text}>
        Welcome to our app! By using this app, you agree to the following terms and conditions:
        {"\n\n"}1. You are responsible for maintaining your account information.
        {"\n\n"}2. You agree not to misuse the app or attempt unauthorized access.
        {"\n\n"}3. The app is provided "as is" without warranties of any kind.
        {"\n\n"}4. We may update these terms from time to time.
      </Text>

      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.text}>
        We value your privacy and commit to protecting your personal information:
        {"\n\n"}1. Your data is collected only to improve your experience.
        {"\n\n"}2. We do not sell your personal information to third parties.
        {"\n\n"}3. You can request deletion of your data at any time.
        {"\n\n"}4. We use secure methods to store and transmit your data.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});
