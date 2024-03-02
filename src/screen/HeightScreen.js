import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, } from 'react-native';
// import { ToastAndroid } from 'react-native'
import Slider from '@react-native-community/slider'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, serverTimestamp, collection } from 'firebase/firestore'

import { InputNumberValidation } from '../utils/Validation';
import { Authentication, Firestore } from '../config/firebase'

const HeightScreen = ({ navigation, route }) => {
  const payload = route.params
  const [height, setHeight] = useState(150);

  const handleSliderChange = (value) => {
    setHeight(value);
  };

  const handleSubmit = () => {
    const response = InputNumberValidation({ field: 'Height', value: height, min: 0, max: 1000 })
    if (response != null) {
      Alert.alert('Error', response)
      return
    }

    RegisterAccount({
      ...payload,
      height: height,
    })
  };

  const RegisterAccount = async (payload) => {
    ToastAndroid.show('Registering...', ToastAndroid.LONG)

    try {
      const userCredential = await createUserWithEmailAndPassword(Authentication, payload.email, payload.password)
      const uid = userCredential.user.uid

      const __payload = { ...payload }
      delete __payload.password

      const user = {
        uid: uid,
        ...__payload,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }

      console.log(user)

      await setDoc(doc(collection(Firestore, 'users'), uid), user)

      Alert.alert('Success', 'Account has been created successfully!', [
        {
          text: 'OK',
          onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
        },
      ])
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.firstView}>
        <Text style={styles.title}> What's Your </Text>
        <Text style={styles.subtitle}> Height </Text>
        <Text style={styles.label}> {height} cm</Text>
        <View style={styles.sliderView}>
          <Slider
            style={styles.slider}
            minimumValue={50}
            maximumValue={300}
            step={1}
            value={height}
            onValueChange={handleSliderChange}
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

export default HeightScreen

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
})