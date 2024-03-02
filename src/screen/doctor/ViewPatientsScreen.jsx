import { Alert, StyleSheet, Text, View } from 'react-native'
// import { ToastAndroid } from 'react-native'
import React from 'react'
import { FlashList } from '@shopify/flash-list'
import { and, collection, deleteDoc, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import { Timestamp } from 'firebase/firestore'

import { Firestore } from '../../config/firebase'

const ViewPatientsScreen = ({ navigation }) => {
  const [requests, setRequests] = React.useState([])

  const FetchPatients = async () => {
    ToastAndroid.show('Loading...', ToastAndroid.SHORT)

    try {
      const response = await getDocs(collection(Firestore, 'users'))
      const __users = []

      response.forEach(doc => {
        __users.push({
          id: doc.id,
          ...doc.data()
        })
      })

      const currentUser = JSON.parse(await AsyncStorage.getItem('currentUser'))
      const requests = await getDocs(query(
        collection(Firestore, 'requests'),
        and(
          where('receiverId', '==', currentUser.uid),
          where('status', '==', 'accepted'),
        )
      ))

      const __requests = []
      requests.forEach(doc => {
        __requests.push({
          id: doc.id,
          ...doc.data()
        })
      })

      __requests.map(request => {
        const user = __users.find(user => user.id === request.senderId)
        request.sender = user
      })

      setRequests(__requests)
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }

  React.useEffect(() => {
    FetchPatients()
  }, [])

  const RenderListEmptyComponent = () => (
    <Text style={{
      textAlign: 'center',
      fontSize: 18,
      color: 'blue',
      marginTop: 8,
    }}>No Record Found!</Text>
  )

  const DeletePatient = async (id) => {
    try {
      ToastAndroid.show('Deleting...', ToastAndroid.SHORT)
      await deleteDoc(doc(Firestore, 'requests', id))
      ToastAndroid.show('Patient Deleted Successfully!', ToastAndroid.SHORT)
    } catch (error) {
      Alert.alert('Error', error.message)
    }

    const _requests = requests.filter(request => request.id !== id)
    setRequests(_requests)
  }

  const RenderListItem = ({ item }) => {
    return (
      <TouchableOpacity style={{
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 12,
        elevation: 4,
        marginHorizontal: 16,
        gap: 8
      }} activeOpacity={0.62} onPress={() => {
        navigation.navigate('profile', { user: item.sender })
      }} onLongPress={() => {
        Alert.alert('Confirm', 'Are you sure you want to delete this patient?', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            onPress: () => DeletePatient(item.id),
          },
        ])
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'blue' }}>{item.sender?.username}</Text>
          <Text style={{ fontSize: 16 }}>{item.sender?.age} years</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16 }}>{item.sender?.email}</Text>
          <Text style={{ fontSize: 16 }}>{item.sender?.gender}</Text>
        </View>
        <Text style={{ fontSize: 16, color: 'red' }}>Accepted On: {
          (() => {
            const _ = new Timestamp(item.acceptedOn.seconds, item.acceptedOn.nanoseconds).toDate()
            return moment(_).format('DD/MM/YYYY hh:mm A')
          })()
        }</Text>


      </TouchableOpacity>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <FlashList
        data={requests}
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

export default ViewPatientsScreen

const styles = StyleSheet.create({}) 