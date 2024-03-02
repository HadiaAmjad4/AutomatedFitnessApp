import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Button = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: 'blue',
    width: '75%',
  }} activeOpacity={0.62}>
    <Text style={{ color: 'white', fontSize: 20 }}>{title}</Text>
  </TouchableOpacity>
)

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
       <Button title="My Profile" onPress={() => navigation.navigate('test')} 
      
      /> 
      <Button title="View Patients" onPress={() => navigation.navigate('view_patients')} />
      <Button title="View Requests" onPress={() => navigation.navigate('doctor_requests')} />
      <Button title="Logout" onPress={() => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
          {
            text: 'Cancel',
            onPress: () => { },
          },
          {
            text: 'Logout', onPress: async () => {
              await AsyncStorage.clear()
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              })
            },
          },
        ])
      }} />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: "#001253",
    justifyContent: 'center',
    alignItems: 'center',
     gap: 10 

  },
  button : {
    backgroundColor: 'midnightblue',
  }
})