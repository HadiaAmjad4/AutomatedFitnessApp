import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { ROLES } from '../config/values'

const MainScreen = ({ navigation }) => {
  const SkipAuthentication = async () => {
    const user = await AsyncStorage.getItem('currentUser')

    if (user) {
      const currentUser = JSON.parse(user)
      const { accountType } = currentUser
      let screen = 'Login'

      if (accountType === ROLES.DOCTOR) {
        screen = 'doctor_home'
      } else if (accountType === ROLES.PATIENT) {
        screen = 'menu'
      } else if (accountType === ROLES.ADMIN) {
        screen = 'menu'
      }

      navigation.reset({ index: 0, routes: [{ name: screen }] })
    }
  }

  React.useEffect(() => {
    SkipAuthentication()
  }, [])

  return (
    <View style={{ backgroundColor: '#001253', height: 1000 }}>
      <SafeAreaView>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Image source={require('../../assets/logo2.png')} style={styles.logo} />
          </TouchableOpacity>
          <Text style={{ marginLeft: 105, fontWeight: 'bold', fontSize: 30, marginTop: 18, color: '#fff' }}>
            healthOpedia
          </Text>
          <Text style={{ marginLeft: 125, fontSize: 18, marginTop: 15, color: '#fff' }}>
            Where compassion
          </Text>
          <Text style={{ marginLeft: 127, fontSize: 18, color: '#fff' }}>
            & healthcare meet
          </Text>
        </View>
      </SafeAreaView>
    </View>
  )
}

export default MainScreen

const styles = StyleSheet.create({
  logo: {
    height: 230,
    width: 230,
    marginTop: 175,
    marginLeft: 85,
    borderRadius: 200
  }
})