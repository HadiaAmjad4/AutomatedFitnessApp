import React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Alert , Image} from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Pedometer } from "expo-sensors";
import CircularProgress from "react-native-circular-progress-indicator";
import Slider from '@react-native-community/slider'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { Firestore } from '../config/firebase'

const { width } = Dimensions.get('window');

const PedometerScreen = () => {
  const navigation = useNavigation();
  const [PedometerAvailability, SetPedometerAvailability] = useState("");
  const [StepCount, SetStepCount] = useState(0);
  const [TargetStepCount, setTargetStepCount] = useState(0);
  const [DistanceCovered, setDistanceCovered] = useState(0);
  const [CaloriesBurnt, setCaloriesBurnt] = useState(0);
  const [WalkingTime, setWalkingTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = () => {
    const subscription = Pedometer.watchStepCount((result) => {
      SetStepCount(result.steps);
      calculateDistance(result.steps);
      calculateCalories(result.steps);
      calculateWalkingTime(result.steps);
    });


    Pedometer.isAvailableAsync().then(
      (result) => {
        SetPedometerAvailability(String(result));
      },
      (error) => {
        SetPedometerAvailability(error);
      }
    );
  };

  const calculateDistance = (steps) => {
    const distance = steps / 1300;
    setDistanceCovered(distance.toFixed(4));
  };

  const calculateCalories = (steps) => {
    const distance = steps / 1300;
    const calories = distance * 60;
    setCaloriesBurnt(calories.toFixed(4));
  };

  const calculateWalkingTime = (steps) => {
    const walkingTime = Math.floor(steps / 131); // Assuming an average walking speed of 5 km/h (approximately 131 steps per minute)
    setWalkingTime(walkingTime);
  };

  const onTargetStepCountChange = (value) => {
    setTargetStepCount(value);
    calculateDistance(value);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hour = currentTime.getHours() % 12;
  const minute = currentTime.getMinutes();
  const second = currentTime.getSeconds();

  const hourRotation = 30 * hour + 0.5 * minute;
  const minuteRotation = 6 * minute + 0.1 * second;
  const secondRotation = 6 * second;


  const SaveData = async () => {
    try {
      const currentUser = JSON.parse(await AsyncStorage.getItem('currentUser'))
      const docRef = doc(Firestore, 'users', currentUser.uid);
      await setDoc(docRef, {
        stepCount: StepCount,
        targetStepCount: TargetStepCount,
        distanceCovered: DistanceCovered,
        caloriesBurnt: CaloriesBurnt,
        walkingTime: WalkingTime,
        updatedAt: serverTimestamp()
      }, { merge: true });

      Alert.alert("Success", "Data saved successfully", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        }
      ]);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }

  return (
    <View style={styles.container}>
      <Svg width={width} viewBox={`0 0 ${width} 100`} style={styles.svg}>
        <Path
          d={`M0 30 Q ${width / 4} 0, ${width / 2} 30 T ${width} 30 V 100 H 0 Z`}
          fill='#A1C2F1' // Adjust the color as per your requirements

        />
      </Svg>

      <View style={styles.circle}>
        <CircularProgress
          value={StepCount}
          maxValue={TargetStepCount}
          radius={100}
          textColor={'#fff'}
          activeStrokeColor={'#A1C2F1'}
          inActiveStrokeColor={'#A1C2F1'}
          inActiveStrokeOpacity={0.7}
          inActiveStrokeWidth={16}
          activeStrokeWidth={13}
          title={'Step Count'}
          titleColor={'#fff'}
          titleStyle={{ fontWeight: 'bold' }}
          titleFontSize={22}

        />
      </View>

      <View style={styles.waveView}>

        <View style={styles.target}>
          <Text style={styles.TargetText}> Target </Text>
          <Text style={styles.TargetBody}>  {TargetStepCount} Steps </Text>
          <Text style={styles.TargetBody2}> {DistanceCovered} km </Text>
        </View>
        <View style={styles.target}>
          <Text style={styles.DisText}> Covered </Text>
          <Text style={styles.DisBody}> {StepCount} Steps </Text>
        </View>
      </View>
      <View style={styles.waveView2} >
        <View style={styles.calView}>
          <Text style={styles.calText}> Calories Burnt </Text>
          <Text style={styles.calText2}> {CaloriesBurnt}</Text>
        </View>
        <View style={styles.calView}>
          <Text style={styles.walkText}> Walking Time </Text>
          <Text style={styles.calText2}>{WalkingTime} Min</Text>

        </View>
      </View>
      <View style={styles.sliderView}>
        <Text style={styles.sliderText}>
          {TargetStepCount} steps ({DistanceCovered} km)
        </Text>
        <Slider
          minimumValue={0}
          maximumValue={10000}
          step={100}
          value={TargetStepCount}
          onValueChange={onTargetStepCountChange}
          thumbTintColor="white"
          minimumTrackTintColor="#blue"
          maximumTrackTintColor="lightgray"
          style={styles.slider}
        />
      </View>

      {/* APPLY STYLE HERE */}
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
        <TouchableOpacity style={{
          backgroundColor: '#001253',
          borderRadius: 10,
          paddingHorizontal: 24,
          paddingVertical: 8,
        }} onPress={SaveData}>
          <Text style={styles.text}>Save Data</Text>
        </TouchableOpacity>
      </View>
      <View style= {styles.backaroowView}> 
      
      <TouchableOpacity
      onPress={() => navigation.navigate("menu")}
      > 
        <Image 
        source={require('../../assets/backarrow.png')} 
         style = {styles.back}
        />
      </TouchableOpacity>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001253',
    paddingTop : 60,

  },
  svg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 900,

  },
  waveView: {
    backgroundColor: '#A1C2F1',
    flex: 1,
    width: 400,
    height : 500,
    marginTop: 340,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',

  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  circle: {
    marginLeft: 100,
    marginTop: 30,
  },
  target: {
    backgroundColor: '#001253',
    height: 110,
    width: 170,
    marginBottom: 320,
    borderRadius: 10,
  },
  TargetText: {
    fontSize: 25,
    color: '#fff',
    fontWeight: '600',
    marginTop: 10,
    marginLeft: 38,
  },
  TargetBody: {
    color: '#fff',
    marginLeft: 34,
    marginTop: 8,
    fontSize: 18,
  },
  TargetBody2: {
    color: '#fff',
    marginLeft: 37,
    marginTop: 8,
    fontSize: 18,
  },
  DisText: {
    fontSize: 25,
    color: '#fff',
    fontWeight: '600',
    marginTop: 10,
    marginLeft: 28,
  },
  DisBody: {
    color: '#fff',
    marginLeft: 46,
    marginTop: 8,
    fontSize: 20,
    marginTop: 15,
  },
  waveView2: {
    flexDirection: 'row',
    marginTop : -20,
  },
  calView: {
    height: 110,
    width: 170,
    marginTop: 240,
    backgroundColor: '#001253',
    borderRadius: 10,
    marginLeft: 18,
  },
  calText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
    marginTop: 10,
    marginLeft: 5,
  },
  calText2: {
    color: '#fff',
    marginLeft: 63,
    marginTop: 8,
    fontSize: 20,
    marginTop: 15,
  },
  walkText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: '600',
    marginTop: 10,
    marginLeft: 8,
  },
  sliderView: {
    height: 100,
    width: 340,
    backgroundColor: '#001253',
    marginTop: 20,
    marginLeft: 25,
    borderRadius: 10,
  },
  slider: {
    width: 250,
    marginLeft: 42,
    marginTop: 10,

  },
  sliderText: {
    color: '#fff',
    marginLeft: 63,
    marginTop: 8,
    fontSize: 20,
    marginTop: 15,
  },
  back : {
    height : 30,
    width : 30,
    marginTop : 10,
  },
  backaroowView : {
    alignItems : 'center',
    justifyContent : 'center',
    marginLeft : 20,
      },
});

export default PedometerScreen;