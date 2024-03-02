import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { InputStringValidation } from '../utils/Validation';

const RoleScreen = ({ navigation }) => {
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleSubmit = () => {
    console.log(selectedRole)
    const response = InputStringValidation({ field: 'Role', value: selectedRole, min: 2, max: 60 })
    if (response != null) {
      Alert.alert('Error', response)
      return
    }

    navigation.navigate('gender', {
      accountType: selectedRole,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleRoleSelect('doctor')}>
        <Image
          source={require('../../assets/doctor.png')}
          style={{ width: 150, height: 100, marginBottom: 10, marginTop: 130, marginLeft: 120 }}
        />
        <Text style={styles.RoleText}> Doctor</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleRoleSelect('patient')}>
        <Image
          source={require('../../assets/user.png')}
          style={{ width: 170, height: 100, marginBottom: 10, marginTop: 30, marginLeft: 110 }}
        />
        <Text style={styles.RoleText}>User</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }}
        onPress={handleSubmit}
        disabled={!selectedRole}
      >
        <View style={styles.round}>
          <Image
            source={require('../../assets/forward.png')}
            style={styles.Img}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RoleScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#001253',
    // height: 750,
    flex: 1,
  },
  RoleText: {
    color: '#fff',
    fontSize: 25,
    fontWeight: '600',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  round: {
    height: 120,
    width: 120,
    borderRadius: 100,
    backgroundColor: '#213363',
    marginTop: 75,
    marginLeft: 120,
  },
  Img: {
    height: 60,
    width: 60,
    marginLeft: 35,
    marginTop: 30,
  }
})