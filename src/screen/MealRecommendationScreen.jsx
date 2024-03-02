import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { CheckBox } from 'react-native-elements'

const MealRecommendationScreen = ({ navigation, route }) => {
  const [hasHypertension, setHasHypertension] = useState(false)
  const [hasDiabetes, setHasDiabetes] = useState(false)

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{}}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckBox checked={hasHypertension} onValueChange={() => {
            setHasHypertension(!hasHypertension)
          }} />
          <Text style={{ marginLeft: 10 }}>Has Hypertension</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckBox value={hasDiabetes} onValueChange={setHasDiabetes} />
          <Text style={{ marginLeft: 10 }}>Has Diabetes</Text>
        </View>
      </View>
    </View>
  )
}

export default MealRecommendationScreen

const styles = StyleSheet.create({})