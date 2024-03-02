import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth'
import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
// import { ToastAndroid } from 'react-native'
import { TextInput } from 'react-native-paper'
import { Authentication, Firestore } from '../config/firebase'
import { doc, getDoc } from 'firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Alert } from 'react-native'
import { ROLES } from '../config/values'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const HandleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(Authentication, email)
      Alert.alert('Success', 'Password reset email sent successfully!')
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  const AuthenticateUser = async () => {
    ToastAndroid.show('Authenticating...', ToastAndroid.SHORT)

    try {
      const response = await signInWithEmailAndPassword(Authentication, email, password)
      const uid = response.user.uid

      const user = await getDoc(doc(Firestore, 'users', uid))

      if (user.exists()) {
        const __userData = user.data()
        const { accountType } = __userData

        await AsyncStorage.setItem('currentUser', JSON.stringify(__userData))

        if (accountType === ROLES.DOCTOR) {
          navigation.reset({ index: 0, routes: [{ name: 'doctor_home' }] })
        }
        else if (accountType === ROLES.PATIENT) {
          navigation.reset({ index: 0, routes: [{ name: 'menu' }] })
        }
        else if (accountType === ROLES.ADMIN) {
          navigation.reset({ index: 0, routes: [{ name: 'menu' }] })
        }
      } else {
        Alert.alert('Error', 'User does not exist')
      }
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  React.useEffect(() => { }, [])

  return (
    <View style={styles.container}>
      <View>
        {
          <Image
            source={require('../../assets/logo2.png')}
            style={{
              height: 150,
              width: 150,
              marginTop: 80,
              marginLeft: 125,
              borderRadius: 200,
            }}
          />
        }
        <Text style={styles.title}>Login Here</Text>
      </View>

      <View>
        <View>
          <TextInput
            label="Email"
            style={{
              width: 250,
              marginTop: 70,
              backgroundColor: '#FFF5E1',
              marginLeft: 70,
            }}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            label="Password"
            style={{
              width: 250,
              marginTop: 20,
              backgroundColor: '#FFF5E1',
              marginLeft: 70,
            }}
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <TouchableOpacity
          style={{
            marginTop: 30,
            height: 50,
            width: 250,
            marginLeft: 75,
            backgroundColor: '#820000',
            borderRadius: 100,
          }}
          onPress={() => AuthenticateUser()}
        >
          <Text style={{
            marginTop: 12,
            marginLeft: 100,
            fontWeight: 'bold',
            color: '#fff',
            fontSize: 20,
          }}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={HandleResetPassword}>
          <Text style={{
            marginLeft: 140,
            marginTop: 10,
            fontWeight: 'bold',
            color: '#fff',
          }}>Forgot Password?</Text>
        </TouchableOpacity>

        <Text style={{
          marginTop: 125,
          marginLeft: 95,
          fontWeight: '500',
          color: '#fff',
        }}>Don't have an account?
          <TouchableOpacity onPress={() => navigation.navigate("role")}>
            <Text style={{
              fontWeight: 'bold',
              fontStyle: 'italic',
              color: '#fff',
            }}>Sign Up</Text>
          </TouchableOpacity>
        </Text>
      </View>

    </View>
  )
}


export default LoginScreen

const styles = StyleSheet.create({
  container: {
    // backgroundColor : '#8EA7E9',
    backgroundColor: '#001253',
    height: 1000,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: 125,
    marginTop: 15,
    color: '#fff',
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