import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, Alert } from 'react-native';
import { InputStringValidation, REGULAR_EXPRESSION } from '../utils/Validation';

const EmailScreen = ({ navigation, route }) => {
  const payload = route.params;

  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    const response = InputStringValidation({ field: 'Email Address', value: email, min: 5, max: 60, regExp: REGULAR_EXPRESSION.EMAIL })
    if (response != null) {
      Alert.alert('Error', response)
      return
    }

    navigation.navigate('password', {
      ...payload,
      email: email,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.firstView}>
        <Text style={styles.title}> What's Your </Text>
        <Text style={styles.subtitle}> Email </Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
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

export default EmailScreen;
const styles = StyleSheet.create({
  container: {
    // backgroundColor : '#001253',
    // height: 750,
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
