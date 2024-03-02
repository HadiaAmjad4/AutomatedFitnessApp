import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { InputNumberValidation } from '../utils/Validation';

const AgeScreen = ({ navigation, route }) => {
  
  const payload = route.params

  const [userage, setUserage] = useState('');

  const handleUserageChange = (text) => {
    setUserage(text);
  };

  const handleSubmit = () => {
    const response = InputNumberValidation({ field: 'Age', value: userage, min: 0, max: 200 })
    if (response != null) {
      Alert.alert('Error', response)
      return
    }

    navigation.navigate('weight', {
      ...payload,
      age: userage,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstView}>
        <Text style={styles.title}> What's Your </Text>
        <Text style={styles.subtitle}> Age </Text>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Enter your age"
            value={userage}
            onChangeText={handleUserageChange}
            style={styles.input}
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
      >
        <View style={styles.round}>
          <Image
            source={require('../../assets/forward.png')}
            style={styles.Img}
          />
        </View>

      </TouchableOpacity>

    </View>
  )
}

export default AgeScreen

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: '#fff',
  },
  firstView: {

    backgroundColor: '#001253',
    height: 450,
    width: 395,

    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: '500',
    marginTop: 170,
    marginLeft: 20,
  },
  subtitle: {
    fontSize: 25,
    color: '#fff',
    fontWeight: '500',
    marginLeft: 25,
    marginTop: 10,
  },
  inputView: {

    width: 200,
    height: 50,
    marginLeft: 27,
    marginTop: 20,
    borderRadius: 20,
    backgroundColor: '#213363',
  },

  input: {
    color: '#fff',
    marginLeft: 27,
    marginTop: 12,
    fontSize: 20,
  },
  round: {
    height: 120,
    width: 120,
    borderRadius: 100,
    backgroundColor: '#001253',
    marginTop: 75,
    marginLeft: 140,
  },
  Img: {
    height: 60,
    width: 60,
    marginLeft: 35,
    marginTop: 30,
  }
})