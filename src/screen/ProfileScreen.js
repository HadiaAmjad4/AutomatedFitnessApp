import AsyncStorage from '@react-native-async-storage/async-storage'
import { doc, getDoc } from 'firebase/firestore'
import React from 'react'
import { Alert } from 'react-native'
import { StyleSheet, Text, View, ScrollView , TouchableOpacity, Image} from 'react-native'
import { Firestore } from '../config/firebase'
import { ROLES } from '../config/values'

const ProfileScreen = ({ navigation, route }) => {
  const { user } = route.params || {}

  const [username, setUsername] = React.useState('Loading...')
  const [email, setEmail] = React.useState('Loading...')
  const [accountType, setAccountType] = React.useState('Loading...')
  const [age, setAge] = React.useState('Loading...')
  const [gender, setGender] = React.useState('Loading...')
  const [height, setHeight] = React.useState('Loading...')
  const [weight, setWeight] = React.useState('Loading...')
  const [BMI, setBMI] = React.useState('Loading...')
  const [BMR, setBMR] = React.useState('Loading...')

  const [stepCount, setStepCount] = React.useState('Loading...')
  const [targetStepCount, setTargetStepCount] = React.useState('Loading...')
  const [distanceCovered, setDistanceCovered] = React.useState('Loading...')
  const [caloriesBurnt, setCaloriesBurnt] = React.useState('Loading...')
  const [walkingTime, setWalkingTime] = React.useState('Loading...')

  const [waterIntakeGoal, setWaterIntakeGoal] = React.useState('Loading...')
  const [waterIntakeConsumed, setWaterIntakeConsumed] = React.useState('Loading...')
  const [waterIntakeGlassCount, setWaterIntakeGlassCount] = React.useState('Loading...')
  const [waterIntakeFilledGlassCount, setWaterIntakeFilledGlassCount] = React.useState('Loading...')
  const [waterIntakeTotalGlassCount, setWaterIntakeTotalGlassCount] = React.useState('Loading...')
  const [waterIntakeLastGlassTime, setWaterIntakeLastGlassTime] = React.useState('Loading...')

  const FetchData = async () => {
    try {
      const currentUser = JSON.parse(await AsyncStorage.getItem('currentUser'))
      const docRef = doc(Firestore, 'users', currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data()
        setUsername(data.username)
        setEmail(data.email)
        setGender(data.gender)
        setAge(data.age)
        setHeight(data.height)
        setWeight(data.weight)
        setAccountType(data.accountType)

        setStepCount(data.stepCount)
        setTargetStepCount(data.targetStepCount)
        setDistanceCovered(data.distanceCovered)
        setCaloriesBurnt(data.caloriesBurnt)
        setWalkingTime(data.walkingTime)

        setWaterIntakeGoal(data.waterIntake?.goal)
        setWaterIntakeConsumed(data.waterIntake?.consumed)
        setWaterIntakeGlassCount(data.waterIntake?.glassCount)
        setWaterIntakeFilledGlassCount(data.waterIntake?.filledGlassCount)
        setWaterIntakeTotalGlassCount(data.waterIntake?.totalGlassCount)
        setWaterIntakeLastGlassTime(data.waterIntake?.lastGlassTime)
      } else {
        Alert.alert('Error', 'User Data not found!', [
          {
            text: 'Re-login',
            onPress: () => navigation.reset({ index: 0, routes: [{ name: 'Login' }] })
          }
        ]);
      }
    } catch (e) {
      Alert.alert('Error', e.message)
    }

    CalculateBMI()
    CalculateBMR()
  }

  const ReadFromLocal = async () => {
    const currentUser = JSON.parse(await AsyncStorage.getItem('currentUser'))
    setUsername(currentUser.username)
    setEmail(currentUser.email)
    setGender(currentUser.gender)
    setAge(currentUser.age)
    setHeight(currentUser.height)
    setWeight(currentUser.weight)
    setAccountType(currentUser.accountType)

    CalculateBMI()
    CalculateBMR()
  }

  const CalculateBMI = () => {
    if (height && weight) {
      const heightInMeter = parseFloat(height) / 100
      const bmi = weight / (parseFloat(heightInMeter) * parseFloat(heightInMeter))
      setBMI(bmi.toFixed(2))
    }

  }

  const CalculateBMR = () => {
    if (gender === 'Male') {
      setBMR((10 * parseFloat(weight)) + (6.25 * parseFloat(height)) - (5 * parseFloat(age)) + 5)
    } else if (gender === 'Female') {
      setBMR((10 * parseFloat(weight)) + (6.25 * parseFloat(height)) - (5 * parseFloat(age)) - 161)
    }
  }

  React.useEffect(() => {
    if (!user) {
      ReadFromLocal().then(() => FetchData())
    } else if (user) {
      setUsername(user?.username || 'N/A')
      setEmail(user?.email || 'N/A')
      setGender(user?.gender || 'N/A')
      setAge(user?.age || 'N/A')
      setHeight(user?.height || 'N/A')
      setWeight(user?.weight || 'N/A')
      setAccountType(user?.accountType || 'N/A')

      setStepCount(user?.stepCount || 0)
      setTargetStepCount(user?.targetStepCount || 0)
      setDistanceCovered(user?.distanceCovered || 0)
      setCaloriesBurnt(user?.caloriesBurnt || 0)
      setWalkingTime(user?.walkingTime || 'N/A')

      setWaterIntakeGoal(user?.waterIntake?.goal || 0)
      setWaterIntakeConsumed(user?.waterIntake?.consumed || 0)
      setWaterIntakeGlassCount(user?.waterIntake?.glassCount || 0)
      setWaterIntakeFilledGlassCount(user?.waterIntake?.filledGlassCount || 0)
      setWaterIntakeTotalGlassCount(user?.waterIntake?.totalGlassCount || 0)
      setWaterIntakeLastGlassTime(user?.waterIntake?.lastGlassTime || 'N/A')
    }
  }, [])

  const Row = ({ label, value }) => (
    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
      <Text style={{ flex: 1, fontWeight: 'bold', fontSize: 18 }}>{label == null ? 'N/A' : label}</Text>
      <Text style={{ flex: 1, textAlign: 'right', fontSize: 18 }}>{value == null ? 'N/A' : value}</Text>
    </View>
  )

  return (
    <ScrollView style={{ backgroundColor: '#A1C2F1' , paddingTop : 60,
  paddingBottom : 30, 
  }}
      contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 20, gap: 20 }}>
      <View>
      <View style= {styles.backaroowView}> 
        <TouchableOpacity
          onPress={() => navigation.navigate("menu")}
        >
        <Image source={require('../../assets/backarrow.png')} 
        style = {styles.back}/>
        </TouchableOpacity>
      </View>
        <Text style={styles.header}>Personal Information</Text>
        <Row label="Username" value={username} />
        <Row label="Email" value={email} />
        <Row label="Account Type" value={accountType} />
        <Row label="Age" value={age} />
        <Row label="Gender" value={gender} />
        <Row label="Height" value={height} />
        <Row label="Weight" value={weight} />
        <Row label="BMI" value={BMI} />
        <Row label="BMR" value={BMR} />
      </View>

      {
        (accountType === ROLES.PATIENT || user) &&
        <>
          <View>
            <Text style={styles.header}>Health Information</Text>
            <Row label="Step Count" value={stepCount} />
            <Row label="Target Step Count" value={targetStepCount} />
            <Row label="Distance Covered" value={distanceCovered} />
            <Row label="Calories Burnt" value={caloriesBurnt} />
            <Row label="Walking Time" value={walkingTime} />
          </View>

          <View>
            <Text style={styles.header}>Water Intake Information</Text>
            <Row label="Goal" value={waterIntakeGoal} />
            <Row label="Consumed" value={waterIntakeConsumed} />
            <Row label="Glass Count" value={waterIntakeGlassCount} />
            <Row label="Filled Glass Count" value={waterIntakeFilledGlassCount} />
            <Row label="Total Glass Count" value={waterIntakeTotalGlassCount} />
            <Row label="Last Glass Time" value={waterIntakeLastGlassTime} />
          </View>
     
        </>
      }
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'midnightblue',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
    padding: 10,
  },
  backaroowView : {
    marginTop : 20,
    marginBottom : 20,
    alignItems : 'flex-start',
    justifyContent : 'flex-start',
    marginLeft : 20,
      },
      back : {
        height : 30,
        width : 30,
      }
})