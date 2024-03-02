import { Alert, StyleSheet, Text, View } from 'react-native'
import { ToastAndroid } from 'react-native'
import React from 'react'
import { FlashList } from '@shopify/flash-list'
import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore'
import { TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Firestore } from '../config/firebase'

const DoctorScreen = ({ navigation }) => {
  const [doctors, setDoctors] = React.useState([])

  const FetchDoctors = async () => {
    ToastAndroid.show('Loading...', ToastAndroid.SHORT)

    try {
      const response = await getDocs(
        query(
          collection(Firestore, 'users'),
          where('accountType', '==', 'doctor')
        )
      )
      const __doctors = []

      response.forEach(doc => {
        __doctors.push({
          id: doc.id,
          ...doc.data()
        })
      })

      setDoctors(__doctors)
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  React.useEffect(() => {
    FetchDoctors()
  }, [])

  const RenderListEmptyComponent = () => (
    <Text style={{
      textAlign: 'center',
      fontSize: 18,
      color: 'blue',
      marginTop: 8,
    }}>No Record Found!</Text>
  )

  const MakeRequest = async (id) => {
    try {
      ToastAndroid.show('Sending...', ToastAndroid.SHORT)

      const currentUser = JSON.parse(await AsyncStorage.getItem('currentUser'))
      await addDoc(collection(Firestore, 'requests'), {
        senderId: currentUser.uid,
        receiverId: id,
        status: 'pending',
        timestamp: serverTimestamp(),
      })

      ToastAndroid.show('Request Sent!', ToastAndroid.SHORT)
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  const RenderListItem = ({ item }) => {
    return (
<View >
      <TouchableOpacity style={
        styles.container
      } 
      activeOpacity={0.62}
       onPress={() => {
        Alert.alert('Confirm', 'Are you sure you want to send request to this doctor?', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Send',
            onPress: () => MakeRequest(item.id),
          },
        ])
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' ,color : 'white'}}>{item.username}</Text>
          <Text style={{ fontSize: 16,color : 'white' }}>{item.age} years</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16,color : 'white' }}>{item.email}</Text>
          <Text style={{ fontSize: 16 ,color : 'white'}}>{item.gender}</Text>
        </View>
      </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={doctors}
        renderItem={RenderListItem}
        estimatedItemSize={129}
        ListEmptyComponent={RenderListEmptyComponent}
        ListHeaderComponent={<View style={{ padding: 12 }} />}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListFooterComponent={<View style={{ height: 100 }} />}
      />
    </View>

  )
}

export default DoctorScreen


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#001253',
    borderRadius: 8,
    padding: 12,
    elevation: 4,
    marginHorizontal: 16,
    gap: 8,
 
  },
})