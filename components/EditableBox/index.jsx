import editIcon from '@/assets/edit.png';
import { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function EditableBox({ label, value, editable, onSave }) {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    onSave && onSave(inputValue);
    setEditing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <TextInput
          value={inputValue}
          onChangeText={setInputValue}
          editable={editing || editable}
          style={[styles.input, !(editing || editable) && styles.disabledInput]}
        />
        {editable && (
          <TouchableOpacity onPress={() => setEditing(!editing)}>
            <Image source={editIcon} style={styles.editIcon} />
          </TouchableOpacity>
        )}
      </View>
      {editing && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  label: { fontSize: 14, color: '#666', marginBottom: 5 },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8 },
  disabledInput: { backgroundColor: '#eee', color: '#888' },
  editIcon: { width: 24, height: 24, marginLeft: 10 },
  saveButton: { marginTop: 10, backgroundColor: '#4857A6', padding: 10, borderRadius: 8 },
  saveText: { color: '#fff', textAlign: 'center', fontWeight: '600' },
});
