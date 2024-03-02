import { ImageBackground, StyleSheet, Text, View, Slider,Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Pedometer } from "expo-sensors";
import CircularProgress from "react-native-circular-progress-indicator";

const TestScreen = () => {
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

  return (
    <View style={styles.container}>
      <Text>TestScreen</Text>
    
      <CircularProgress
  value={StepCount}
  maxValue={TargetStepCount}
  radius={200}
  textColor={'#ecf0f1'}
  activeStrokeColor={'#f39c12'}
  inActiveStrokeColor={'#9b59b6'}
  inActiveStrokeOpacity={0.5}
  inActiveStrokeWidth={35}
  activeStrokeWidth={32}
  title={'Step Count'}
  titleColor={'#ecf0f1'}
  titleStyle={{ fontWeight: 'bold' }}
  titleFontSize={25}

/>

      <Text>
        Target: {TargetStepCount} steps ({DistanceCovered} km)
      </Text>
      <Slider
        minimumValue={0}
        maximumValue={10000}
        step={100}
        value={TargetStepCount}
        onValueChange={onTargetStepCountChange}
      />
      <Text>Distance Covered: {DistanceCovered} km</Text>
      <Text>Calories Burnt: {CaloriesBurnt}</Text>
      <Text>Walking Time: {WalkingTime} minutes</Text>
      <View style={styles.clockContainer}>
      <View style={[styles.clockHand, styles.hourHand, { transform: [{ rotate: `${hourRotation}deg` }] }]} />
      <View style={[styles.clockHand, styles.minuteHand, { transform: [{ rotate: `${minuteRotation}deg` }] }]} />
      <View style={[styles.clockHand, styles.secondHand, { transform: [{ rotate: `${secondRotation}deg` }] }]} />
    </View>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "green",
  },
  clockContainer: {
    position: "relative",
    width: 200,
    height: 200,
   
  },
  clockBackground: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  clockHand: {
    position: "absolute",
    backgroundColor: "black",
  },
  hourHand: {
    width: 4,
    height: 60,
    top: 70,
    left: 98,
    borderRadius: 4,
    transformOrigin: "2px 56px",
  },
  minuteHand: {
    width: 3,
    height: 90,
    top: 50,
    left: 99.5,
    borderRadius: 3,
    transformOrigin: "1.5px 86px",
  },
  secondHand: {
    width: 1,
    height: 100,
    top: 40,
    left: 100,
    borderRadius: 1,
    transformOrigin: "0.5px 96px",
    backgroundColor: "red",
  },
});
