import { useListings } from '@/app/(context)/ListingsContext';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

export const options = {
  title: 'Add Listing',
};

const { width } = Dimensions.get('window');
const PHOTO_SIZE = (width - 40 - 10) / 3;

const CreateListingScreen = () => {
  const router = useRouter();
  const { addListing } = useListings();

  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleRemovePhoto = (id) => {
    setPhotos(photos.filter(p => p.id !== id));
  };

  const handleUploadPhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Media library permission is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const newPhoto = { id: Date.now().toString(), uri: result.assets[0].uri };
      setPhotos([newPhoto, ...photos]);
    }
  };

  const handleSubmit = () => {
    if (!title || !price) {
      alert('Please fill all required fields');
      return;
    }
    addListing({ title, price, description, photos });
    router.push('/My-Listings/my-listings');
  };

  const PhotoPreview = ({ uri, id }) => (
    <View style={styles.photoContainer}>
      <Image source={{ uri }} style={styles.photo} />
      <TouchableOpacity style={styles.removePhotoBtn} onPress={() => handleRemovePhoto(id)}>
        <Icon name="close-circle" size={20} color="#666" style={{ backgroundColor: 'white', borderRadius: 10 }} />
      </TouchableOpacity>
    </View>
  );

  const UploadButton = () => (
    <TouchableOpacity style={styles.uploadBtn} onPress={handleUploadPhoto}>
      <Icon name="add" size={30} color="#666" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.screenTitle}>Add Listing</Text>

        <Text style={styles.sectionTitle}>Upload photos</Text>
        <View style={styles.photosRow}>
          <UploadButton />
          {photos.map(photo => <PhotoPreview key={photo.id} uri={photo.uri} id={photo.id} />)}
        </View>

        <Text style={styles.inputLabel}>Title</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Listing Title"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.inputLabel}>Price</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Enter price"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />

        <Text style={styles.inputLabel}>Description</Text>
        <TextInput
          style={[styles.textInput, styles.descriptionInput]}
          placeholder="Tell us more..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  content: { padding: 20 }, // padding servadest
  screenTitle: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#333', marginBottom: 10 },
  photosRow: { flexDirection: 'row', marginBottom: 20 },
  uploadBtn: {
    width: PHOTO_SIZE,
    height: PHOTO_SIZE,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  photoContainer: { width: PHOTO_SIZE, height: PHOTO_SIZE, borderRadius: 8, marginRight: 10 },
  photo: { width: '100%', height: '100%', borderRadius: 8 },
  removePhotoBtn: { position: 'absolute', top: -5, right: 5, zIndex: 10 },
  inputLabel: { fontSize: 14, fontWeight: '500', color: '#333', marginTop: 15, marginBottom: 5 },
  textInput: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
  },
  descriptionInput: { height: 120, paddingTop: 15, textAlignVertical: 'top', marginBottom: 30 },
  submitButton: { backgroundColor: '#4857A6', paddingVertical: 15, borderRadius: 12, marginBottom: 20 },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
});

export default CreateListingScreen;
