import { StyleSheet, Text, View , TouchableOpacity, Image ,SafeAreaView} from 'react-native'
import React from 'react'
import { TextInput } from 'react-native-paper'

const SignupScreen = ({navigation}) => {
  return (
    <View style={{
      backgroundColor : '#8EA7E9',
  }}>
    

     <SafeAreaView>
   

      <View>
       

       { <Image source = {{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR8rUqXXxVJWgtByr8RhjZtG_S84hMnuIotg&usqp=CAU'}}
     style = {{
         height : 150,
         width: 150,
         marginTop : 80,
        marginLeft : 125,
        borderRadius : 200,
       

     }}
     
      /> }
      
       <Text  style={{
fontWeight : 'bold',
fontSize : 30,
marginLeft : 115,
marginTop : 15,

 }}>
Signup Here
</Text>
  </View>

  <View style={{
     backgroundColor : '#8EA7E9',
     height : 500,
   }}>
  
   <TextInput
    label = "Name"
    style={{
        width : 250,
        marginTop : 30,
        backgroundColor : '#FFF5E1',
        marginLeft : 70,
        
    }}
   
   />
 <TextInput
    label = "Email"
    style={{
        width : 250,
        marginTop : 15,
        backgroundColor : '#FFF5E1',
        marginLeft : 70,
        
    }}
   
   />
  
   <TextInput
    label = "Password"
    style={{
        width : 250,
        marginTop : 15,
        backgroundColor : '#FFF5E1',
        marginLeft : 70,
        
    }}
    
   />
   
   <TouchableOpacity
   style = {{
    marginTop : 30,
    height : 50,
    width : 250,
    marginLeft : 75,
    backgroundColor : '#820000',
    borderRadius : 100,
   }}
   onPress={() => navigation.navigate("Home")}
>
   
  <Text  style = {{
    marginTop : 12,
    marginLeft : 90,
    fontWeight : 'bold',
    color : '#fff',
    fontSize : 20,
   }}>
    Signup
  </Text>
</TouchableOpacity>


 

   <Text style = {{
    marginTop : 125,
    marginLeft : 95,
    fontWeight : '500',
  }} >
    Already have an account?
    <TouchableOpacity
    onPress={() => navigation.navigate("Login")}
     >
    <Text style = {{
         fontWeight : 'bold',
         fontStyle : 'italic',
         color : '#fff',
        
    }}>
        Login
    </Text>
    </TouchableOpacity>
  </Text>
   </View>
      </SafeAreaView>
    </View>
  )
}


export default SignupScreen

const styles = StyleSheet.create({})