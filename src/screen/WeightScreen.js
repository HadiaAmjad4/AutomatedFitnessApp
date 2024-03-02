import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';
import { InputNumberValidation } from '../utils/Validation';

const WeightScreen = ({ navigation, route }) => {
  const payload = route.params;

  const [weight, setWeight] = useState('');

  const handleWeightChange = (text) => {
    setWeight(text);
  };

  const handleSubmit = () => {
    const response = InputNumberValidation({ field: 'Weight', value: weight, min: 0, max: 1000 })
    if (response != null) {
      Alert.alert('Error', response)
      return
    }

    navigation.navigate('height', {
      ...payload,
      weight: weight,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstView}>
        <Text style={styles.title}> What's Your </Text>
        <Text style={styles.subtitle}> Weight </Text>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Enter your weight in kg"
            value={weight}
            onChangeText={handleWeightChange}
            keyboardType="numeric"
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
  );
};

export default WeightScreen;
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
  label: {
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 18,
  },
  sliderView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  slider: {
    width: '80%',
    marginTop: 10,

  },
  Img: {
    height: 60,
    width: 60,
    marginLeft: 35,
    marginTop: 30,
  },
  round: {
    height: 120,
    width: 120,
    borderRadius: 100,
    backgroundColor: '#001253',
    marginTop: 75,
    marginLeft: 140,
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
})
