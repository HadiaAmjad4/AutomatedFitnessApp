import React, { useState } from 'react';
import { View, Dimensions, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import { Svg, Path, Circle, Text as SvgText } from 'react-native-svg';
import Modal from 'react-native-modal';
import Slider from '@react-native-community/slider'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { Firestore } from '../config/firebase'
import { Alert } from 'react-native';

const WaveScreen = ({ navigation }) => {

  const [goal, setGoal] = useState(1); // Goal in liters
  const [consumed, setConsumed] = useState(0); // Consumed amount in liters
  const [glassCount, setGlassCount] = useState(0); // Glass count
  const [filledGlassCount, setFilledGlassCount] = useState(0); // Filled glass count
  const [totalGlassCount, setTotalGlassCount] = useState(0); // Total glass count
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility
  const [lastGlassTime, setLastGlassTime] = useState(null); // Time of most recent glass consumed
  // Function to increment the consumed amount and glass count


  const { width } = Dimensions.get('window');
  const waveHeight = 0.8 * width;
  const waveStartX = -0.8 * width;
  const waveEndX = width + 0.3 * width;

  const incrementConsumed = () => {
    if (consumed < goal) {
      setConsumed((prevConsumed) => prevConsumed + 0.3); // Update to add 0.3 liters (300ml) per glass
      setGlassCount((prevCount) => prevCount + 1); // Increment glass count
      setTotalGlassCount((prevTotal) => prevTotal + 1); // Increment total glass count
      setFilledGlassCount((prevFilledCount) => prevFilledCount + 1); // Increment filled glass count
      setLastGlassTime(new Date());
    }
  };
  // Function to format the time as HH:MM AM/PM
  const formatTime = (time) => {
    const options = { hour: 'numeric', minute: '2-digit' };
    return time.toLocaleTimeString([], options);
  };
  const calculateProgress = () => {
    const progress = (consumed / goal) * 100;
    return Math.min(progress, 100); // Ensure progress is capped at 100%
  };


  // Function to update the goal amount
  const updateGoal = (value) => {
    setGoal(value);
  };

  // Function to toggle the modal visibility
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // Function to check if goal is reached and show the modal
  const checkGoalReached = () => {
    if (consumed >= goal) {
      toggleModal();
    }
  };


  // Calculate the total number of glasses required to reach the goal
  const totalGlassesRequired = Math.ceil((goal * 1000) / 300);

  // Array to store the required number of glasses
  const glassesArray = Array.from({ length: totalGlassesRequired }, (_, index) => index);

  // Function to render a row of glasses
  const renderGlassRow = (rowIndex) => {
    const startIndex = rowIndex * 3;
    const endIndex = Math.min(startIndex + 3, totalGlassesRequired);

    return (
      <View style={{ flexDirection: 'row', marginTop: 10 }} key={rowIndex}>
        {glassesArray.slice(startIndex, endIndex).map((glass, index) => (
          <Image
            key={index}
            source={
              glass < filledGlassCount
                ? require('../../assets/glass-filled.png')
                : require('../../assets/glass-empty.png')
            }
            style={{ width: 20, height: 40, marginLeft: 10, marginRight: 5 }}
          />
        ))}
      </View>
    );
  };

  const getProgressText = () => {
    const progress = calculateProgress();

    if (progress === 0) {
      return "Set goal to get started";
    } else if (progress < 30) {
      return "On your journey";
    } else if (progress >= 30 && progress <= 70) {
      return "Keep going";
    } else if (progress > 70 && progress < 100) {
      return "Almost there";
    } else {
      return "Goal reached";
    }
  };


  const SaveData = async () => {
    try {
      const currentUser = JSON.parse(await AsyncStorage.getItem('currentUser'));
      const userDoc = doc(Firestore, 'users', currentUser.uid);
      await setDoc(userDoc, {
        waterIntake: {
          goal,
          consumed,
          glassCount,
          filledGlassCount,
          totalGlassCount,
          lastGlassTime,
        },
        updatedAt: serverTimestamp(),
      }, { merge: true })

      Alert.alert('Success', 'Water intake saved successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        }
      ])
    } catch (error) {
      Alert.alert('Error', error.message)
    }
  }


  return (
    <View style={{ flex: 1, backgroundColor: '#001253' , }}>
      <View style={styles.wavetext}>
        <Text style={styles.waveTextTitle}>Stay hydrated</Text>
        <Text style={styles.waveTextSubtitle}>Track your water intake</Text>

      </View>
      <View style={styles.wave}>
        <Svg style={{ width: '100%', height: waveHeight, position: 'absolute', top: 0 }}>
          <Path
            d={`M ${waveStartX} 0 C ${0.4 * width} ${0.1 * waveHeight}, ${0.6 * width} ${0.4 * waveHeight}, ${0.8 * width} ${0.2 * waveHeight} C ${0.8 * width} ${0.1 * waveHeight}, ${waveEndX} ${0.2 * waveHeight}, ${waveEndX} 0 L ${waveStartX} 0`}
            fill="#A1C2F1"
          />
        </Svg>
      </View>

      <View style={styles.contentView}>
        <View style={styles.sliderView}>
          <Text style={styles.contentText1}>Set Goal</Text>
          <Text style={styles.goal_liter}> {goal}L</Text>

          <Slider
            style={styles.slider}
            value={goal}
            onValueChange={updateGoal}
            minimumValue={1}
            maximumValue={4.5}
            step={0.5}
            thumbTintColor="white"
            minimumTrackTintColor="blue"
            maximumTrackTintColor="lightgray"
          />


          <View style={styles.goalResult}>
            <Text style={styles.Result}>  Consumed</Text>
            <Text style={styles.goalset}>  Liters : {consumed.toFixed(2)} /  {goal} </Text>

            <Text style={styles.goalsetGlass}>
              Glasses :   {glassCount}/ {totalGlassesRequired}
            </Text>

            {/* Progress Circle */}
            <View style={{
              marginLeft: 15,
              marginTop: 3,
            }}>
              <Svg width={150} height={150}>
                <Circle
                  cx={75}
                  cy={75}
                  r={55}
                  stroke="#A1C2F1"
                  strokeWidth={10}
                  fill="transparent"
                />
                <Circle
                  cx={75}
                  cy={75}
                  r={55}

                  stroke="#A1C2F1"
                  // stroke="#001253"
                  strokeWidth={10}
                  fill="transparent"
                  strokeDasharray={`${calculateProgress()} ${100 - calculateProgress()}`}
                  strokeDashoffset={25} // Adjust as needed to position the progress
                  strokeLinecap="round"
                />
                <SvgText
                  x="50%"
                  y="52%"
                  textAnchor="middle"
                  stroke="none"
                  fontSize={20}
                  fontWeight="bold"
                  fill="#fff"
                >
                  {`${calculateProgress()}%`}
                </SvgText>
              </Svg>
            </View>

          </View>
        </View>



        <View style={styles.roundContainer}>
          <View style={styles.glassContainer}>
            {Array.from({ length: Math.ceil(totalGlassesRequired / 3) }, (_, index) => renderGlassRow(index))}
          </View>

          <TouchableOpacity style={styles.button} onPress={() => {
            incrementConsumed();
            checkGoalReached();
          }}>
            <Text style={styles.buttonText}>Add Glass</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.timeView}>
        <Text style={styles.goalText}>
          {getProgressText()}
        </Text>
        <Text style={styles.recentTimeText}>
          Last Added {lastGlassTime ? formatTime(lastGlassTime) : 'No glasses'}
        </Text>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => {
            setGoal(1);
            setConsumed(0);
            setGlassCount(0);
            setFilledGlassCount(0);
            setTotalGlassCount(0);
          }}
        >
          <Text
            style={styles.resetText}
          >
            Reset Goal
          </Text>
        </TouchableOpacity>

        <Modal isVisible={isModalVisible} onBackdropPress={toggleModal}>
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Goal Reached!</Text>
            <Text style={{ marginTop: 10 }}>{goal}L</Text>
            <Button title="OK" onPress={toggleModal} />
          </View>
        </Modal>
      </View>
      <View style={{
       
       alignItems : 'center',
       justifyContent : 'center',
       marginTop : 15,
      }}>
        <TouchableOpacity style={{
          backgroundColor: '#001253',
          borderRadius: 10,
          marginTop : -10,
          // paddingHorizontal: 16,
          // paddingVertical: 8,
        }} onPress={SaveData}>
          <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Save Data</Text>
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

export default WaveScreen;

const styles = StyleSheet.create({
  wave: {
    marginTop: 140,
    backgroundColor: '#001253',
    marginTop: 0,
  },
  wavetext: {
    height: 160,
    backgroundColor: '#A1C2F1',
    paddingTop : 20,
  },
  contentView: {
    marginTop: 90,
    flexDirection: 'row',
  },
  waveTextTitle: {
    color: '#0E2954',
    fontWeight: '600',
    fontSize: 35,
    marginLeft: 20,
    marginTop: 60,
  },
  waveTextSubtitle: {
    color: '#0E2954',
    marginLeft: 25,
    marginTop: 10,
    fontSize: 18,
    fontWeight: '500',
  },
  contentText1: {
    fontSize: 25,
    fontWeight: '600',
    color: '#fff',
    marginTop: 10,
    marginLeft: 40,
  },
  roundContainer: {
    borderRadius: 20,
    marginTop: 30,
    marginLeft: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'green',
    height: 400,
    width: 150,
    backgroundColor: '#213363',
  },
  contentText2: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  timeText: {
    fontSize: 14,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  goalText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#22A699',
    marginLeft: 100,
    marginTop: 5,
    paddingRight: 10,

  },
  goalset: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 30,
    marginTop: 10,
  },
  goalsetGlass: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 35,
    marginTop: 10,
  },
  glassContainer: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  glassContainer: {
    marginTop: 10,
  },
  glassImage: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
  },
  timeText: {
    fontSize: 12,
    marginTop: 5,
  },

  button: {
    backgroundColor: '#001253',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    position: 'absolute',
    marginTop: 340,
    marginLeft: 20,
    width: 110,
    height: 45,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    marginLeft: 3,
    marginTop: 2,
    fontWeight: 'bold',
  },
  recentTimeText: {
    fontSize: 14,
    marginTop: 20,
  },
  slider: {
    width: 150,
    marginBottom: 5,
    marginTop: 0,
    marginLeft: 15,
  },
  sliderView: {
    borderRadius: 20,
    backgroundColor: '#213363',
    height: 130,
    width: 190,
    marginTop: 30,
    marginLeft: 15,
  },
  goalView: {
    borderRadius: 20,
    backgroundColor: '#213363',
    height: 100,
    width: 190,
    marginTop: 15,

  },
  goalResult: {
    borderRadius: 20,
    backgroundColor: '#213363',
    height: 253,
    width: 190,
    marginTop: 35,
    marginLeft: 3,
  },
  Result: {
    fontSize: 25,
    fontWeight: '600',
    color: '#fff',
    marginTop: 10,
    marginLeft: 20,
    fontStyle: 'italic',
  },
  goalPercentage: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 35,
    marginLeft: 25,
    fontStyle: 'italic',

  },
  insideGoal: {
    backgroundColor: '#001253',
    height: 100,
    width: 100,
    borderRadius: 100,
    marginLeft: 35,
    marginTop: 5,
  },
  timeView: {
    height: 73,
    width: 350,
    backgroundColor: '#213363',
    marginTop: 20,
    marginLeft: 20,
    borderRadius: 20,
  },
  currentTimeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  recentTimeText: {
    color: '#fff',
    marginLeft: 100,
    marginTop: 2,
    fontStyle: 'italic',
  },
  goal_liter: {
    marginTop: 10,
    color: '#fff',
    marginLeft: 80,
    fontSize: 15,
  },
  resetButton: {
    height: 20,
    width: 100,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginLeft: 120,
    backgroundColor: '#001253',
    marginTop: 3,
  },
  resetText: {
    color: '#fff',
    marginLeft: 15,
  },
  back : {
    height : 30,
    width : 30,
    marginTop : 10,
  },
  backaroowView : {
    alignItems : 'center',
    justifyContent : 'center',
  
      },
});