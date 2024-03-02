import React, { useState } from 'react'
import { View, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native'
import { InputStringValidation } from '../utils/Validation';

const GenderScreen = ({ navigation, route }) => {
  const payload = route.params

  const [selectedGender, setSelectedGender] = useState('');

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleSubmit = () => {
    const response = InputStringValidation({ field: 'Gender', value: selectedGender, min: 2, max: 60 })
    if (response != null) {
      Alert.alert('Error', response)
      return
    }

    navigation.navigate('name', {
      ...payload,
      gender: selectedGender,
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => handleGenderSelect('Male')}>
        <Image
          source={require('../../assets/GenderMale.png')}
          style={{ width: 120, height: 120, marginBottom: 10, marginTop: 100, }}
        />
        <Text style={styles.GenderText}>Male</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleGenderSelect('Female')}>
        <Image
          source={require('../../assets/GenderFemale.png')}
          style={{ width: 120, height: 120, marginBottom: 10, marginTop: 20, }}
        />
        <Text style={styles.GenderText}>Female</Text>
      </TouchableOpacity>
      <TouchableOpacity

        onPress={handleSubmit}
        disabled={!selectedGender}
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

export default GenderScreen;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#001253',
    alignItems: 'center',
    //    justifyContent : 'center',
    // height: 750,
    flex: 1,


  },
  GenderText: {
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

  },
  Img: {
    height: 60,
    width: 60,
    marginLeft: 35,
    marginTop: 30,

  }

})