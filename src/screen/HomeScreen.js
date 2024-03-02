import { StyleSheet, Text, View ,TouchableOpacity,SafeAreaView} from 'react-native'
import React from 'react'

const HomeScreen = ({navigation}) => {
  return (
    <View style={{
      backgroundColor : '#8EA7E9',
      height : 800,
     
  }}>
   <TouchableOpacity
   style = {{
    marginTop : 270,
    height : 70,
    width : 270,
    marginLeft : 65,
    backgroundColor : '#2B3467',
    borderRadius : 100,
   }}
   onPress={() => navigation.navigate("cal")}
>
   
  <Text  style = {{
    marginTop : 20,
    marginLeft : 100,
    fontWeight : 'bold',
    color : '#fff',
    fontSize : 20,
   }}
   onPress={() => navigation.navigate("cal")}
   >
    Doctor
  </Text>
</TouchableOpacity>


<TouchableOpacity
   style = {{
    marginTop : 20,
    height : 70,
    width : 270,
    marginLeft : 65,
    backgroundColor : '#2B3467',
    borderRadius : 100,
   }}
   onPress={() => navigation.navigate("Pedo")}
>
   
  <Text  style = {{
    marginTop : 20,
    marginLeft : 100,
    fontWeight : 'bold',
    color : '#fff',
    fontSize : 20,
   }}>
    Patient
  </Text>
</TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})