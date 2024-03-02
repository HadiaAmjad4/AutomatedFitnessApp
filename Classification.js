



import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart } from "react-native-chart-kit";
import { SvgXml } from 'react-native-svg';
import { useRoute, useNavigation } from '@react-navigation/native';

const Classification = ({ route }) => {
  const navigation = useNavigation();
  const { bmi, bmr } = route.params;

  const classification = () => {
    if (bmi < 18.5) {
      return 'UNDERWEIGHT';
    } else if (bmi >= 18.5 && bmi < 25) {
      return 'NORMAL';
    } else if (bmi >= 25 && bmi < 30) {
      return 'OVERWEIGHT';
    } else {
      return 'OBESE';
    }
  };

  const bmiClassification = classification();

  const calculateAdjustedBmr = (classification) => {
    if (classification === 'UNDERWEIGHT') {
      return bmr + 300;
    } else if (classification === 'OVERWEIGHT') {
      return bmr - 200;
    } else {
      return bmr;
    }
  };

  const adjustedBmr = calculateAdjustedBmr(bmiClassification);

  const goToMealScreen = () => {
    const x = classification()
    navigation.navigate('meal', {
      ...route.params, bmi, bmr, adjustedBmr,
      bmiScore: (x === 'UNDERWEIGHT') ? -1 : ((x === 'OVERWEIGHT' || 'OBESE') ? 1 : 0)
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Classification</Text>
      <View style={styles.chart}>
        <LineChart
          data={{
            labels: ["Thin", "Underweight", "Normal", "Pre-Obese", "Obesity"],
            datasets: [
              {
                data: [16.0, 19.0, 25.0, 30.0, 40.0]
              }
            ]
          }}
          height={280}
          width={370}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={7}
          chartConfig={{
            backgroundColor: "#001253",
            backgroundGradientFrom: "#001253",
            backgroundGradientTo: "#001253",
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `#fff`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#850E35"
            }
          }}
          style={{
            marginVertical: 18,
            marginTop: 60,
          }}
        />
      </View>
      <Text style={styles.resultHead}>Your Result</Text>
      <View style={styles.box}>
        <View style={{
          flexDirection: 'row',
        }}>
          <Text style={{
            marginLeft: 45,
            fontSize: 18,
            fontWeight: 'bold',
            color: '#fff',
            marginTop: 10,
          }}>BMI:</Text>
          <Text style={{
            marginLeft: 50,
            fontSize: 18,
            fontWeight: 'bold',
            color: '#fff',
            marginTop: 10,
          }}>BMR:</Text>
        </View>
        <View style={{
          flexDirection: 'row',
          marginTop: 10,
          alignItems: 'center',
        }}>
          <Text style={styles.result}>{bmi}</Text>
          <Text style={styles.result}>{bmr}</Text>
        </View>
        <View style={styles.Wclass}>
          <Text style={[styles.class, bmiClassification === 'NORMAL' ? styles.normalText : styles.abnormalText]}>
            {bmiClassification}
          </Text>
        </View>
      </View>
      <Text style={styles.resultValue}>Adjusted BMR: {adjustedBmr} Kcal</Text>
      <TouchableOpacity style={styles.mealButton} onPress={goToMealScreen}>
        <Text style={styles.mealText}>Want your Meal Recommendations?</Text>
      </TouchableOpacity>
      <View style= {styles.backaroowView}> 
        <TouchableOpacity
          onPress={() => navigation.navigate("menu")}
        >
        <Image source={require('./assets/backarrow.png')} 
        style = {styles.back}/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Classification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#001253',
    alignItems: 'center',
    paddingTop : 70,
  },
  title: {
    marginTop: 30,
    fontSize: 26,
    fontWeight: 'bold',
    color: '#C8E8EA',
  },
  chart: {
    marginBottom: -35,
    alignItems: 'center',
  },
  box: {
    width: 250,
    height: 115,
    borderColor: '#5A96E3',
    backgroundColor: '#213363',
    borderRadius: 10,
  },
  resultHead: {
    color: '#C8E8EA',
    fontWeight: '600',
    fontSize: 28,
    marginRight: 100,
    marginBottom: 10,
    marginTop: 40,
  },
  result: {
    marginTop: 0,
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
    marginLeft: 40,
  },
  class: {
    marginTop: 10,
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
  },
  normalText: {
    color: 'green',
  },
  abnormalText: {
    color: '#B31312',
  },
  resultValue: {
    color: '#fff',
    marginTop: 20,
  },
  Wclass: {
    alignItems: 'center',
  },
  mealButton: {
    marginTop: 30,
  },
  mealText: {
    color: '#fff',
    fontStyle: 'italic',
    fontSize: 18
  },
  backaroowView : {
marginTop : 20,
  },
  back : {
    height : 30,
    width : 30,
  }
});
