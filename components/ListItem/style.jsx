import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2.22,
    elevation: 3,
  },
  content: {},
  title: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 2 },
  subtitle: { fontSize: 12, color: '#999', marginTop: 2 },
});
