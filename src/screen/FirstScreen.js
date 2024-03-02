import { StyleSheet, Text, View , TouchableOpacity, Image} from 'react-native'
import React from 'react'

const FirstScreen = ({navigation}) => {
  return (
    <View style={{ backgroundColor: '#001253', height: 870, justifyContent : 'center', alignItems : 'center' }}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Image source={require('../../assets/logo2.png')} style={styles.logo} />
          </TouchableOpacity>
      
    <View style = {{ alignItems : 'center', justifyContent : 'center'}}> 
    <Text style = {styles.text}>Where compassion & healthcare meet</Text>
    </View>
    
    </View>
  )
}

export default FirstScreen

const styles = StyleSheet.create({
    logo: {
        height: 230,
        width: 230,
 
        borderRadius: 180,
      },
      text : {
  fontSize : 20,
  color : '#fff',
  paddingLeft : 105,
  paddingRight : 105,
  marginTop : 10,
fontStyle : 'italic',
marginLeft : 10,
      },

})