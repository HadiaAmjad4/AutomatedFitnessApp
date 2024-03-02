

import React, { useState } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useNavigation } from '@react-navigation/native';
import { API_BASE_URL } from '../config/values';

const MealScreen = ({ route }) => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);
  const [data, setData] = useState(null)

  const [isLoading, setIsLoading] = useState(false)

  const __ = async (payload) => {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json()

    return data.prediction
  }

  const handleOptionSelect = async (option) => {
    setSelectedOption(option);

    setIsLoading(true)

    const payload = {
      age: parseInt(route.params.age),
      weight: parseFloat(route.params.weight),
      height: parseFloat(route.params.height),
      BMI: parseFloat(route.params.bmi),
      BMI_score: route.params.bmiScore,
      hypertension: 0,
      diabetes: 0,
      gender: route.params.gender == 'male' ? 1 : 0,
      BMR: parseFloat(route.params.adjustedBmr),
    }

    if (option === 'Diabetes') {
      payload.hypertension = 0;
      payload.diabetes = 1;
    } else if (option === 'Hypertension') {
      payload.hypertension = 1;
      payload.diabetes = 0;
    } else if (option === 'Both') {
      payload.hypertension = 1;
      payload.diabetes = 1;
    } else if (option === 'None') {
      payload.hypertension = 0;
      payload.diabetes = 0;
    }

    const breakFastData = await __({ ...payload, meal: 0 })
    const lunchData = await __({ ...payload, meal: 1 })
    const dinnerData = await __({ ...payload, meal: 2 })
    const snacksData = await __({ ...payload, meal: 3 })

    const breakFastDataDetails = [
      '2 slices of whole wheat toast + 2 scrambled eggs + 1 small apple',
      '1 whole wheat paratha + ½ cup low fat yogurt + 1 sliced cucumber',
      '2 large eggs (140 calories) 1 cup mixed vegetables (30-50 calories) 1 slice of whole wheat bread',
      '2 brown slices 1 peach and boiled egg',
      'chickpea salad (1 Cup) with grilled Fish Fillet (4 oz) , Daal(1/2 cup)',
      'Vegetable omelet made with egg whites, onions, tomatoes, and spinach, cooked in minimal oil.',
      '4 whole wheat bread slices With cucumber, tomatoes and onion approx and fresh juice',
      '1 small serving of moong dal with mint chutney, 1 small whole wheat roti  1/2 cup of sliced cucumber',
      'Boiled Eggs, Bread ',
      'Oatmeal with sliced bananas and a sprinkle of cinnamon',
      'low-fat paratha with yougert and lassi',
    ]

    const lunchDataDetails = [
      'chickpea salad with cucumber, tomato, and lemon dressing, 1 glass of fresh juice',
      'Spinach curry with brown rice',
      'Bhindi Masala (Okra Curry)  with 1 roti chana Masala (Chickpea Curry) , fresh juice',
      'chana chaat + vegitabele +applecider vinger +sesma seeds and yogert + fresh juice',
      'chicken grilled + mixed veg +raita +chapati',
      'Baked chicken breast(3 oz) , Mix vegetable curry(1/2 cup),Brown Rice(1/2 Cup)',
      'Bhindi sabzi (½ cup lady finger curry) + Whole wheat chapati + ½ cup mint yogurt (raita) + ½ plate salad',
      'Palak gosht (½ cup cooked spinach+1 oz chicken) + 2 tsp olive oil + Whole wheat chapati + ½ cup yogurt + ½ plate salad',
      'Tikka boti ( 3 oz chicken) +  whole wheat chapati + ½ cup mint yogurt + 1 bowl ceaser salad',
      'Kebab, Salad and chapati',
      'Spinach curry with brown rice',
      'Chickpea Salad with Yogurt Dressing and  Palak Paneer with one roti low fat and any fresh juice',
    ]

    const dinnerDataDetails = [
      '1 plate whole wheat Spaghetti + veggies',
      'Chicken Karahi with roti and mix salad',
      'Aloo Palak (Potato and Spinach Curry) with Roti',
      'brown rice  + baingan bharta  +cucumber',
      'veg and chicken curry  + chapatti + oil +fat milk',
      'sham kabab  oil chapatti mint raita',
      'Chicken and Vegetable Macaroni',
      'Grilled Chicken steak with Steamed Vegetables with Fresh Cucumber Mint Lemonade',
      'Chicken Karahi with roti and mix salad',
      'Bahindi masala and roti',
      'Mixed Vegetable Curry with roti Grilled Chicken Salad with Mixed Greens',
      'Bhindi Masala (Okra Curry) 2 roti with Cucumber Raita  fresh juice',
    ]

    const snacksDataDetails = [
      '1 medium banana',
      '1 small bowl yougurt mixed with berries/strawberries',
      '1 of almonds',
      'one cup of air-popped popcorn',
      'Fresh Juice peach',
      'Mixed Nuts(28g)',
      'Apple slices(2) with almond butter',
      'Strawberries with dark chocolate',
      'Cherry tomatoes with mozzarella',
      'Skim milk tea',
      'Peach juice ',
      'Beans Soup',
    ]

    // Uppercase first letter of each word and remove multiple spaces and space b/w + sign
    const stringAdjustment = (str) => {
      return str
        .replace(/\s\+/g, ' + ')
        .replace(/\s+/g, ' ')
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    }

    setData({
      breakfast: stringAdjustment(breakFastDataDetails[breakFastData - 1]),
      lunch: stringAdjustment(lunchDataDetails[lunchData - 1]),
      dinner: stringAdjustment(dinnerDataDetails[dinnerData - 1]),
      snacks: stringAdjustment(snacksDataDetails[snacksData - 1]),
    })

    setIsLoading(false)
  }

  const Card = ({ title, value }) => (
    <View style={{
      borderRadius: 8,
      padding: 16,
      elevation: 4,
      backgroundColor: '#fff',
    }}>
      <Text style={{ fontSize: 20, color: 'red', fontWeight: 'bold' }}>{title}</Text>
      <Text style={{ fontSize: 18 }}>{value}</Text>
    </View>
  )
  return (
    <View style={ styles.container}>
      <RNPickerSelect
        placeholder={{
          label: 'Select an option',
          value: null,
        }}
        onValueChange={(value) => handleOptionSelect(value)}
        items={[
          { label: 'Diabetes', value: 'Diabetes' },
          { label: 'Hypertension', value: 'Hypertension' },
          { label: 'Both', value: 'Both' },
          { label: 'None', value: 'None' },
        ]}
        style={{
          viewContainer: {
            backgroundColor: '#fff',
            borderRadius: 8,
            borderWidth: 1,
            margin: 16
          }
        }}
      />

      {
        isLoading &&
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{
            color: 'red',
            fontSize: 20,
            fontStyle: 'italic',
          }}>Loading...</Text>
        </View>
      }

      {
        data && !isLoading &&
        <View style={{ paddingHorizontal: 16, gap: 16 ,   backgroundColor: '#001253',}}>
          <Card title="Breakfast" value={data.breakfast} />
          <Card title="Lunch" value={data.lunch} />
          <Card title="Dinner" value={data.dinner} />
          <Card title="Snacks" value={data.snacks} />
        </View>
      }

    </View>
  );
};

export default MealScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: "#001253",

  },
})
